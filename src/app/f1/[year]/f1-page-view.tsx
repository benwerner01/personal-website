"use client";

import { FunctionComponent } from "react";
import {
  Box,
  Button,
  styled,
  Container,
  Select,
  MenuItem,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiSupportedYears, ErgastApiSeasonRaces } from "../shared/ergastF1Api";
import DriverRaceResultsLineGraph, {
  RaceDriverWithResultsAndConstructor,
} from "../shared/DriverRaceResultsLineGraph";
import { f1Color } from "../shared/util";

const F1RedButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(f1Color),
  backgroundColor: f1Color,
  boxShadow: "none",
  "&:hover": {
    backgroundColor: f1Color,
    boxShadow: "none",
  },
}));

export const F1PageView: FunctionComponent<{
  year: string;
  seasonRaceResultsByDriver: RaceDriverWithResultsAndConstructor[];
  seasonRaces: ErgastApiSeasonRaces;
}> = ({ year, seasonRaceResultsByDriver, seasonRaces }) => {
  const router = useRouter();

  const yearAsNumber = parseInt(year, 10);
  return (
    <Container sx={{ position: "relative" }}>
      <Box display="flex" position="relative" alignItems="stretch">
        <Link href={`/f1/${yearAsNumber - 1}`}>
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
