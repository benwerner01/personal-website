import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Container, Typography } from "@mui/material";
import {
  fetchSeasonRaceResults,
  fetchSeasonRaceResultsByDriver,
  fetchSeasonRaces,
  RaceDriverWithResultsAndConstructor,
  SeasonRaceResults,
  SeasonRaces,
} from "./shared/ergastF1Api";
import DriverRaceResultsLineGraph from "./shared/DriverRaceResultsLineGraph";

type F1PageProps = {
  year;
  seasonRaceResults: SeasonRaceResults;
  seasonRaceResultsByDriver: RaceDriverWithResultsAndConstructor[];
  seasonRaces: SeasonRaces;
};

type ParsedQueryParams = { year: string };

export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  return {
    fallback: "blocking",
    paths: ["2021", "2022"].map(() => ({ params: { year: "2022" } })),
  };
};

export const getStaticProps: GetStaticProps<
  F1PageProps,
  ParsedQueryParams
> = async ({ params }) => {
  const { year } = params;

  return {
    props: {
      year,
      seasonRaceResults: await fetchSeasonRaceResults({ year }),
      seasonRaceResultsByDriver: await fetchSeasonRaceResultsByDriver({ year }),
      seasonRaces: await fetchSeasonRaces({ year }),
    },
  };
};

const F1Page: NextPage<F1PageProps> = ({
  year,
  seasonRaceResults,
  seasonRaceResultsByDriver,
  seasonRaces,
}) => {
  return (
    <Container sx={{ position: "relative" }}>
      <Typography variant="h1">
        {seasonRaceResults.season} Race Results
      </Typography>
      <DriverRaceResultsLineGraph
        year={year}
        seasonRaceResultsByDriver={seasonRaceResultsByDriver}
        seasonRaces={seasonRaces}
      />
    </Container>
  );
};

export default F1Page;
