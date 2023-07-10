import { NextPage } from "next";

import {
  RaceDriverWithResultsAndConstructor,
  RaceResultWithRound,
} from "../shared/driver-race-results-line-graph";
import {
  fetchSeasonRaceResults,
  fetchSeasonRaces,
} from "../shared/ergast-f1-api";
import { F1PageView } from "./f1-page-view";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const F1Page: NextPage<{ params: { year: string } }> = async ({ params }) => {
  const { year } = params;

  const [seasonRaces, seasonRaceResults] = await Promise.all([
    fetchSeasonRaces({ year }),
    fetchSeasonRaceResults({ year }),
  ]);

  const seasonRaceResultsByDriver = seasonRaceResults.Races.reduce<
    RaceDriverWithResultsAndConstructor[]
  >((prevDriversWithResults, race) => {
    for (const raceResult of race.Results) {
      const driver = raceResult.Driver;
      const raceResultWithCircuit: RaceResultWithRound = {
        ...raceResult,
        round: race.round,
      };

      const existingDriverIndex = prevDriversWithResults.findIndex(
        ({ driverId }) => driverId === driver.driverId
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
          raceResultWithCircuit
        );
        // eslint-disable-next-line no-param-reassign
        prevDriversWithResults[existingDriverIndex].totalPoints += racePoints;
      }
    }
    return prevDriversWithResults;
  }, []);

  return (
    <F1PageView
      year={year}
      seasonRaceResultsByDriver={seasonRaceResultsByDriver}
      seasonRaces={seasonRaces}
    />
  );
};

export default F1Page;
