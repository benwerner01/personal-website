import type {
  ErgastApiRace,
  ErgastApiRaceConstructor,
  ErgastApiRaceDriver,
  ErgastApiRaceResult,
} from "./ergastF1Api";

export type RaceResultWithRound = ErgastApiRaceResult & { round: string };

export type RaceDriverWithResultsAndConstructor = ErgastApiRaceDriver & {
  Results: RaceResultWithRound[];
  Constructor: ErgastApiRaceConstructor;
  totalPoints: number;
};

/**
 * Regroups a season's race results (one entry per race) into one entry per
 * driver, with that driver's results in race order and their points summed.
 *
 * `Constructor` is the team the driver raced for in their first race of the
 * season; mid-season team changes are not reflected.
 */
const groupResultsByDriver = (
  races: ErgastApiRace[],
): RaceDriverWithResultsAndConstructor[] =>
  races.reduce<RaceDriverWithResultsAndConstructor[]>(
    (prevDriversWithResults, race) => {
      for (const raceResult of race.Results) {
        const driver = raceResult.Driver;
        const raceResultWithCircuit: RaceResultWithRound = {
          ...raceResult,
          round: race.round,
        };

        const existingDriverIndex = prevDriversWithResults.findIndex(
          ({ driverId }) => driverId === driver.driverId,
        );

        const racePoints = Number(raceResultWithCircuit.points);

        if (existingDriverIndex < 0) {
          prevDriversWithResults.push({
            ...driver,
            Results: [raceResultWithCircuit],
            Constructor: raceResultWithCircuit.Constructor,
            totalPoints: racePoints,
          });
        } else {
          prevDriversWithResults[existingDriverIndex].Results.push(
            raceResultWithCircuit,
          );
          // eslint-disable-next-line no-param-reassign
          prevDriversWithResults[existingDriverIndex].totalPoints += racePoints;
        }
      }
      return prevDriversWithResults;
    },
    [],
  );

export default groupResultsByDriver;
