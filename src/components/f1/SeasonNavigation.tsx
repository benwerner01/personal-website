"use client";

import React from "react";
import { Box, Button, styled, Select, MenuItem } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiSupportedYears } from "../../lib/f1/ergastF1Api";
import { f1Color } from "../../lib/f1/util";

const F1RedButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(f1Color),
  backgroundColor: f1Color,
  boxShadow: "none",
  "&:hover": {
    backgroundColor: f1Color,
    boxShadow: "none",
  },
}));

type SeasonNavigationProps = {
  year: string;
};

// Previous / next season buttons around a season picker
const SeasonNavigation: React.FC<SeasonNavigationProps> = ({ year }) => {
  const router = useRouter();

  const yearAsNumber = parseInt(year, 10);

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        alignItems: "stretch",
      }}
    >
      <Link href={`/f1/${yearAsNumber - 1}`}>
        <F1RedButton
          variant="contained"
          aria-label="Previous season"
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
            "aria-label": "Season",
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
          aria-label="Next season"
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
  );
};

export default SeasonNavigation;
