import { describe, expect, it } from "vitest";
import type {
  ErgastApiRace,
  ErgastApiRaceConstructor,
  ErgastApiRaceDriver,
  ErgastApiRaceResult,
} from "./ergastF1Api";
import groupResultsByDriver from "./groupResultsByDriver";

const driver = (driverId: string): ErgastApiRaceDriver => ({
  driverId,
  code: driverId.slice(0, 3).toUpperCase(),
  dateOfBirth: "1990-01-01",
  familyName: driverId,
  givenName: driverId,
  nationality: "British",
  permanentNumber: "1",
  url: `https://example.com/${driverId}`,
});

const team = (constructorId: string): ErgastApiRaceConstructor => ({
  constructorId,
  name: constructorId,
  nationality: "British",
  url: `https://example.com/${constructorId}`,
});

const result = (
  driverId: string,
  constructorId: string,
  points: string,
  position: string,
): ErgastApiRaceResult => ({
  Driver: driver(driverId),
  Constructor: team(constructorId),
  Time: { millis: "0", time: "0:00.000" },
  grid: position,
  laps: "50",
  number: "1",
  points,
  position,
  positionText: position,
  status: "Finished",
});

const race = (
  round: string,
  results: ErgastApiRaceResult[],
): ErgastApiRace => ({
  Circuit: {
    circuitId: `circuit-${round}`,
    circuitName: `Circuit ${round}`,
    url: "",
    location: { country: "", lat: "0", locality: "", long: "0" },
  },
  Results: results,
  date: "2023-03-05",
  raceName: `Round ${round} Grand Prix`,
  round,
  season: "2023",
  time: "15:00:00Z",
  url: "",
});

describe("groupResultsByDriver", () => {
  it("returns an empty list for a season with no races", () => {
    expect(groupResultsByDriver([])).toEqual([]);
  });

  it("accumulates each driver's results in round order and sums points", () => {
    const drivers = groupResultsByDriver([
      race("1", [
        result("verstappen", "red_bull", "25", "1"),
        result("hamilton", "mercedes", "18", "2"),
      ]),
      race("2", [
        result("hamilton", "mercedes", "25", "1"),
        result("verstappen", "red_bull", "18", "2"),
      ]),
      race("3", [
        result("verstappen", "red_bull", "0", "20"),
        result("hamilton", "mercedes", "15", "3"),
      ]),
    ]);

    expect(drivers.map(({ driverId }) => driverId)).toEqual([
      "verstappen",
      "hamilton",
    ]);

    const [verstappen, hamilton] = drivers;

    expect(verstappen.Results.map(({ round }) => round)).toEqual([
      "1",
      "2",
      "3",
    ]);
    expect(verstappen.Results.map(({ position }) => position)).toEqual([
      "1",
      "2",
      "20",
    ]);
    expect(verstappen.totalPoints).toBe(43);

    expect(hamilton.Results.map(({ round }) => round)).toEqual(["1", "2", "3"]);
    expect(hamilton.totalPoints).toBe(58);
  });

  it("orders drivers by their first appearance in the season", () => {
    const drivers = groupResultsByDriver([
      race("1", [result("hamilton", "mercedes", "25", "1")]),
      race("2", [
        result("verstappen", "red_bull", "25", "1"),
        result("hamilton", "mercedes", "18", "2"),
      ]),
    ]);

    expect(drivers.map(({ driverId }) => driverId)).toEqual([
      "hamilton",
      "verstappen",
    ]);
    expect(drivers[1].Results.map(({ round }) => round)).toEqual(["2"]);
  });

  it("keeps the driver's details and the constructor from their first race", () => {
    const [ricciardo] = groupResultsByDriver([
      race("1", [result("ricciardo", "alpha_tauri", "0", "15")]),
      race("2", [result("ricciardo", "rb", "10", "5")]),
    ]);

    expect(ricciardo).toMatchObject(driver("ricciardo"));
    // pins the current behaviour: a mid-season team change is not reflected
    expect(ricciardo.Constructor).toEqual(team("alpha_tauri"));
    expect(ricciardo.Results.map(({ Constructor }) => Constructor)).toEqual([
      team("alpha_tauri"),
      team("rb"),
    ]);
  });

  it("adds `round` to every result", () => {
    const [norris] = groupResultsByDriver([
      race("7", [result("norris", "mclaren", "12", "4")]),
    ]);

    expect(norris.Results[0]).toEqual({
      ...result("norris", "mclaren", "12", "4"),
      round: "7",
    });
  });

  // half-point races (1975, 1984, 1991, 2009, 2021) award fractional points
  it("sums fractional half points without truncating them", () => {
    const [prost] = groupResultsByDriver([
      race("5", [result("prost", "mclaren", "9", "1")]),
      race("6", [result("prost", "mclaren", "4.5", "1")]),
      race("7", [result("prost", "mclaren", "1.5", "5")]),
    ]);

    expect(prost.totalPoints).toBe(15);
  });
});
