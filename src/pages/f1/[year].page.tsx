import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
  Box,
  Button,
  styled,
  Container,
  Select,
  MenuItem,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  apiSupportedYears,
  fetchSeasonRaceResults,
  fetchSeasonRaces,
  ErgastApiRaceResult,
  ErgastApiSeasonRaces,
} from "./shared/ergastF1Api";
import DriverRaceResultsLineGraph, {
  RaceDriverWithResultsAndConstructor,
  RaceResultWithRound,
} from "./shared/DriverRaceResultsLineGraph";
import { f1Color } from "./shared/util";
import Link from "next/link";
import { useRouter } from "next/router";

const F1RedButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(f1Color),
  backgroundColor: f1Color,
  boxShadow: "none",
  "&:hover": {
    backgroundColor: f1Color,
    boxShadow: "none",
  },
}));

type F1PageProps = {
  year: string;
  seasonRaceResultsByDriver: RaceDriverWithResultsAndConstructor[];
  seasonRaces: ErgastApiSeasonRaces;
};

type ParsedQueryParams = { year: string };

export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  return {
    fallback: "blocking",
    paths: apiSupportedYears.map((year) => ({
      params: { year: year.toString() },
    })),
  };
};

export const getStaticProps: GetStaticProps<
  F1PageProps,
  ParsedQueryParams
> = async ({ params }) => {
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
        prevDriversWithResults[existingDriverIndex].totalPoints += racePoints;
      }
    }
    return prevDriversWithResults;
  }, []);

  return {
    props: {
      year,
      seasonRaceResultsByDriver,
      seasonRaces,
    },
    revalidate: 100,
  };
};

const F1Page: NextPage<F1PageProps> = ({
  year,
  seasonRaceResultsByDriver,
  seasonRaces,
}) => {
  const router = useRouter();

  const yearAsNumber = parseInt(year, 10);
  return (
    <Container sx={{ position: "relative" }}>
      <Box display="flex" position="relative" alignItems="stretch">
        <Link href={`/f1/${yearAsNumber - 1}`}>
          <a>
            <F1RedButton
              variant="contained"
              sx={{
                px: 1,
                height: "100%",
                minWidth: "unset",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
              color="inherit"
            >
              <ChevronLeft />
            </F1RedButton>
          </a>
        </Link>
        <Box
          sx={{
            borderColor: f1Color,
            borderStyle: "solid",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderRightWidth: 0,
            borderLeftWidth: 0,
            borderRadius: 0,
          }}
        >
          <Select
            value={year}
            onChange={({ target }) => router.push(`/f1/${target.value}`)}
            sx={{
              height: "100%",
              width: 75,
              position: "relative",
            }}
            inputProps={{
              sx: {
                py: 0.5,
                px: 1,
              },
            }}
            disableUnderline
            variant="standard"
          >
            {apiSupportedYears.map((possibleYear) => (
              <MenuItem key={possibleYear} value={possibleYear}>
                {possibleYear}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Link href={`/f1/${yearAsNumber + 1}`}>
          <a>
            <F1RedButton
              variant="contained"
              disabled={new Date().getFullYear() === yearAsNumber}
              sx={{
                px: 1,
                minWidth: "unset",
                height: "100%",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              color="inherit"
            >
              <ChevronRight />
            </F1RedButton>
          </a>
        </Link>
      </Box>
      <DriverRaceResultsLineGraph
        year={year}
        seasonRaceResultsByDriver={seasonRaceResultsByDriver}
        seasonRaces={seasonRaces}
      />
    </Container>
  );
};

export default F1Page;
