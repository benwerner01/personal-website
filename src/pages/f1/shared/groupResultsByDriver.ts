import type { ErgastApiRace } from "./ergastF1Api";
import type {
  RaceDriverWithResultsAndConstructor,
  RaceResultWithRound,
} from "./DriverRaceResultsLineGraph";

// Not a route: next.config.js only treats `*.page.tsx` files as pages.

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

        const racePoints = parseInt(raceResultWithCircuit.points, 10);

        if (existingDriverIndex < 0) {
          prevDriversWithResults.push({
            ...driver,
            Results: [raceResultWithCircuit],
            Constructor: raceResultWithCircuit.Constructor,
            totalPoints: parseInt(raceResultWithCircuit.points, 10),
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
