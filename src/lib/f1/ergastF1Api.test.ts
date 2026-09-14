import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ErgastApiRace,
  ErgastApiRaceResult,
  fetchSeasonRaceResults,
  fetchSeasonRaces,
} from "./ergastF1Api";

const API_BASE_URL = "https://api.jolpi.ca/ergast/f1";

const result = (driverId: string): ErgastApiRaceResult =>
  ({
    Driver: { driverId },
    Constructor: { constructorId: "team" },
    points: "1",
    position: "1",
  }) as ErgastApiRaceResult;

const race = (round: string, results?: ErgastApiRaceResult[]): ErgastApiRace =>
  ({
    round,
    raceName: `Round ${round} Grand Prix`,
    season: "2023",
    ...(results ? { Results: results } : {}),
  }) as ErgastApiRace;

type Page = {
  total: number;
  limit: number;
  offset: number;
  races: ErgastApiRace[];
};

const jsonPage = ({ total, limit, offset, races }: Page) =>
  new Response(
    JSON.stringify({
      MRData: {
        total: String(total),
        limit: String(limit),
        offset: String(offset),
        RaceTable: { season: "2023", Races: races },
      },
    }),
    { status: 200, headers: { "content-type": "application/json" } },
  );

const stubFetch = (respond: (_url: string) => Response) => {
  const fetchMock = vi.fn(async (input: string | URL | Request) =>
    respond(String(input)),
  );
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchSeasonRaceResults", () => {
  it("fetches every page and merges a race that straddles two pages", async () => {
    // 250 results at 100 per page -> offsets 0, 100, 200; round 5's results
    // are split across the first two pages
    const pages: Record<string, Page> = {
      "0": {
        total: 250,
        limit: 100,
        offset: 0,
        races: [
          race("1", [result("a"), result("b")]),
          race("5", [result("c"), result("d")]),
        ],
      },
      "100": {
        total: 250,
        limit: 100,
        offset: 100,
        races: [race("5", [result("e")]), race("6", [result("f")])],
      },
      "200": {
        total: 250,
        limit: 100,
        offset: 200,
        races: [race("7", [result("g")])],
      },
    };

    const fetchMock = stubFetch((url) => {
      const offset = new URL(url).searchParams.get("offset");
      return jsonPage(pages[offset]);
    });

    const season = await fetchSeasonRaceResults({ year: "2023" });

    expect(fetchMock.mock.calls.map(([url]) => String(url))).toEqual([
      `${API_BASE_URL}/2023/results.json?limit=100&offset=0`,
      `${API_BASE_URL}/2023/results.json?limit=100&offset=100`,
      `${API_BASE_URL}/2023/results.json?limit=100&offset=200`,
    ]);

    expect(season.season).toBe("2023");
    expect(season.Races.map(({ round }) => round)).toEqual([
      "1",
      "5",
      "6",
      "7",
    ]);
    expect(
      season.Races.map(({ Results }) =>
        Results.map(({ Driver }) => Driver.driverId),
      ),
    ).toEqual([["a", "b"], ["c", "d", "e"], ["f"], ["g"]]);
  });

  it("stops after a single page when the total fits within it", async () => {
    const fetchMock = stubFetch(() =>
      jsonPage({
        total: 2,
        limit: 100,
        offset: 0,
        races: [race("1", [result("a"), result("b")])],
      }),
    );

    const season = await fetchSeasonRaceResults({ year: "1950" });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(season.Races).toHaveLength(1);
  });

  it("returns an empty season when the API reports no results", async () => {
    stubFetch(() => jsonPage({ total: 0, limit: 100, offset: 0, races: [] }));

    expect(await fetchSeasonRaceResults({ year: "2099" })).toEqual({
      season: "2023",
      Races: [],
    });
  });

  it("rejects on a non-2xx response instead of parsing the body", async () => {
    stubFetch(
      () =>
        new Response("Too Many Requests", {
          status: 429,
          statusText: "Too Many Requests",
        }),
    );

    await expect(fetchSeasonRaceResults({ year: "2023" })).rejects.toThrow(
      /429 Too Many Requests/,
    );
  });

  it("rejects when the request itself fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("fetch failed");
      }),
    );

    await expect(fetchSeasonRaceResults({ year: "2023" })).rejects.toThrow(
      "fetch failed",
    );
  });
});

describe("fetchSeasonRaces", () => {
  it("fetches the schedule endpoint, whose races have no results", async () => {
    const fetchMock = stubFetch(() =>
      jsonPage({
        total: 3,
        limit: 100,
        offset: 0,
        races: [race("1"), race("2"), race("3")],
      }),
    );

    const season = await fetchSeasonRaces({ year: "2023" });

    expect(fetchMock.mock.calls.map(([url]) => String(url))).toEqual([
      `${API_BASE_URL}/2023.json?limit=100&offset=0`,
    ]);
    expect(season.Races.map(({ round }) => round)).toEqual(["1", "2", "3"]);
  });
});
