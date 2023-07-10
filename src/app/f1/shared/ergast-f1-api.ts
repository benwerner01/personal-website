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

export const fetchSeasonRaceResults = async (params: {
  year: string;
}): Promise<ErgastApiSeasonRaceResults> => {
  const { data } = await axios.get<ErgastApiSeasonRaceResultsResponse>(
    `http://ergast.com/api/f1/${params.year}/results.json`,
    {
      params: {
        limit: 1000,
      },
    }
  );

  return data.MRData.RaceTable;
};

export const fetchSeasonRaces = async (params: {
  year: string;
}): Promise<ErgastApiSeasonRaces> => {
  const { data } = await axios.get<ErgastApiSeasonRaceResultsResponse>(
    `http://ergast.com/api/f1/${params.year}.json`,
    {
      params: {
        limit: 100,
      },
    }
  );

  return data.MRData.RaceTable;
};

const currentYear = new Date().getFullYear();

export const apiSupportedYears = Array.from(
  { length: currentYear - 1950 + 1 },
  (_, i) => currentYear - i
);
