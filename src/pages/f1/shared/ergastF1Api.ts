import axios from "axios";

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
    RaceTable: ErgastApiSeasonRaceResults;
  };
};

// ergast.com was retired and now 404s; jolpi.ca serves the same API
const API_BASE_URL = "https://api.jolpi.ca/ergast/f1";

const fetchSeason = async (
  path: string,
  limit: number,
): Promise<ErgastApiSeasonRaceResults> => {
  const { data } = await axios.get<ErgastApiSeasonRaceResultsResponse>(
    `${API_BASE_URL}/${path}`,
    {
      params: {
        limit,
      },
    },
  );

  return data.MRData.RaceTable;
};

export const fetchSeasonRaceResults = async (params: {
  year: string;
}): Promise<ErgastApiSeasonRaceResults> =>
  fetchSeason(`${params.year}/results.json`, 1000);

export const fetchSeasonRaces = async (params: {
  year: string;
}): Promise<ErgastApiSeasonRaces> => fetchSeason(`${params.year}.json`, 100);

const currentYear = new Date().getFullYear();

export const apiSupportedYears = Array.from(
  { length: currentYear - 1950 + 1 },
  (_, i) => currentYear - i,
);
