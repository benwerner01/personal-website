import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
  Box,
  Button,
  styled,
  Container,
  Typography,
  ButtonProps,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  fetchSeasonRaceResults,
  fetchSeasonRaceResultsByDriver,
  fetchSeasonRaces,
  RaceDriverWithResultsAndConstructor,
  SeasonRaceResults,
  SeasonRaces,
} from "./shared/ergastF1Api";
import DriverRaceResultsLineGraph from "./shared/DriverRaceResultsLineGraph";
import { f1Color } from "./shared/util";
import Link from "next/link";

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
  const yearAsNumber = parseInt(year, 10);

  return (
    <Container sx={{ position: "relative" }}>
      <Box display="flex">
        <Link href={`/f1/${yearAsNumber - 1}`}>
          <a>
            <F1RedButton
              variant="contained"
              sx={{
                px: 1,
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
            width: 75,
            borderColor: f1Color,
            borderStyle: "solid",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ color: f1Color }}>
            <strong>{seasonRaceResults.season}</strong>
          </Typography>
        </Box>
        <Link href={`/f1/${yearAsNumber + 1}`}>
          <a>
            <F1RedButton
              variant="contained"
              disabled={new Date().getFullYear() === yearAsNumber}
              sx={{
                px: 1,
                minWidth: "unset",
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
