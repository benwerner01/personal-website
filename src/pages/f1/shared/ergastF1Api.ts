export type ErgastApiRaceLocation = {
  country: string;
  lat: string;
  locality: string;
  long: string;
};

export type ErgastApiRaceCircuit = {
  circuitId: string;
  circuitName: string;
  url: string;
  location: ErgastApiRaceLocation;
};

export type ErgastApiRaceConstructor = {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
};

export type ErgastApiRaceDriver = {
  code?: string;
  dateOfBirth: string;
  driverId: string;
  familyName: string;
  givenName: string;
  nationality: string;
  permanentNumber: string;
  url: string;
};

export type ErgastApiRaceTime = {
  millis: string;
  time: string;
};

export type ErgastApiRaceResult = {
  Constructor: ErgastApiRaceConstructor;
  Driver: ErgastApiRaceDriver;
  Time: ErgastApiRaceTime;
  grid: string;
  laps: string;
  number: string;
  points: string;
  position: string;
  positionText: string;
  status: string;
};

export type ErgastApiRace = {
  Circuit: ErgastApiRaceCircuit;
  Results: ErgastApiRaceResult[];
  date: string;
  raceName: string;
  round: string;
  season: string;
  time: string;
  url: string;
};

export type ErgastApiSeasonRaceResults = {
  season: string;
  Races: ErgastApiRace[];
};

export type ErgastApiSeasonRaces = {
  season: string;
  Races: Omit<ErgastApiRace, "Results">[];
};

type ErgastApiSeasonRaceResultsResponse = {
  MRData: {
    total: string;
    limit: string;
    offset: string;
    RaceTable: ErgastApiSeasonRaceResults;
  };
};

// ergast.com was retired and now 404s; jolpi.ca serves the same API
const API_BASE_URL = "https://api.jolpi.ca/ergast/f1";

// jolpi.ca caps `limit` at 100 (ergast.com allowed 1000), so a season's
// results span several pages. Pages split on results, not races, so a race
// can straddle two pages and its results must be merged.
const PAGE_SIZE = 100;

const fetchSeason = async (
  path: string,
): Promise<ErgastApiSeasonRaceResults> => {
  const races: ErgastApiRace[] = [];
  let season = "";
  let offset = 0;
  let total = Infinity;

  while (offset < total) {
    const query = new URLSearchParams({
      limit: String(PAGE_SIZE),
      offset: String(offset),
    });
    const url = `${API_BASE_URL}/${path}?${query}`;

    // pages must be fetched in order so races are merged in order
    // eslint-disable-next-line no-await-in-loop
    const response = await fetch(url);
    // unlike axios, fetch resolves on 4xx/5xx; throwing keeps the caller's
    // catch (which renders an empty season and shortens revalidation) working
    // when jolpi.ca throttles
    if (!response.ok) {
      throw new Error(
        `Request to ${url} failed: ${response.status} ${response.statusText}`,
      );
    }
    // eslint-disable-next-line no-await-in-loop
    const data: ErgastApiSeasonRaceResultsResponse = await response.json();

    season = data.MRData.RaceTable.season;
    total = parseInt(data.MRData.total, 10);
    offset += parseInt(data.MRData.limit, 10);

    for (const race of data.MRData.RaceTable.Races) {
      const existingRace = races.find(({ round }) => round === race.round);
      if (existingRace && race.Results) {
        existingRace.Results = [
          ...(existingRace.Results ?? []),
          ...race.Results,
        ];
      } else {
        races.push(race);
      }
    }
  }

  return { season, Races: races };
};

export const fetchSeasonRaceResults = async (params: {
  year: string;
}): Promise<ErgastApiSeasonRaceResults> =>
  fetchSeason(`${params.year}/results.json`);

export const fetchSeasonRaces = async (params: {
  year: string;
}): Promise<ErgastApiSeasonRaces> => fetchSeason(`${params.year}.json`);

const currentYear = new Date().getFullYear();

export const apiSupportedYears = Array.from(
  { length: currentYear - 1950 + 1 },
  (_, i) => currentYear - i,
);
