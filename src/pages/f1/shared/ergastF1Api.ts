import axios from "axios";

type RaceLocation = {
  country: string;
  lat: string;
  locality: string;
  long: string;
};

type RaceCircuit = {
  circuitId: string;
  circuitName: string;
  url: string;
  location: RaceLocation;
};

type RaceConstructor = {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
};

type RaceDriver = {
  code?: string;
  dateOfBirth: string;
  driverId: string;
  familyName: string;
  givenName: string;
  nationality: string;
  permanentNumber: string;
  url: string;
};

type RaceTime = {
  millis: string;
  time: string;
};

type RaceResult = {
  Constructor: RaceConstructor;
  Driver: RaceDriver;
  Time: RaceTime;
  grid: string;
  laps: string;
  number: string;
  points: string;
  position: string;
  positionText: string;
  status: string;
};

export type RaceResultWithRound = RaceResult & { round: string };

export type RaceDriverWithResultsAndConstructor = RaceDriver & {
  Results: RaceResultWithRound[];
  Constructor: RaceConstructor;
  totalPoints: number;
};

export type Race = {
  Circuit: RaceCircuit;
  Results: RaceResult[];
  date: string;
  raceName: string;
  round: string;
  season: string;
  time: string;
  url: string;
};

export type SeasonRaceResults = {
  season: string;
  Races: Race[];
};

export type SeasonRaces = {
  season: string;
  Races: Omit<Race, "Results">[];
};

type ErgastSeasonRaceResultsResponse = {
  MRData: {
    RaceTable: SeasonRaceResults;
  };
};

export const fetchSeasonRaceResults = async (params: {
  year: string;
}): Promise<SeasonRaceResults> => {
  const { data } = await axios.get<ErgastSeasonRaceResultsResponse>(
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
}): Promise<SeasonRaces> => {
  const { data } = await axios.get<ErgastSeasonRaceResultsResponse>(
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
