import React from "react";
import type { Metadata } from "next";
import { Container, Typography } from "@mui/material";
import {
  fetchSeasonRaceResults,
  fetchSeasonRaces,
  ErgastApiSeasonRaceResults,
} from "../../../lib/f1/ergastF1Api";
import groupResultsByDriver from "../../../lib/f1/groupResultsByDriver";
import SeasonNavigation from "../../../components/f1/SeasonNavigation";
import DriverRaceResultsLineGraph from "../../../components/f1/DriverRaceResultsLineGraph";
import { pageMetadata } from "../../../lib/metadata";

type Params = { year: string };

type F1PageProps = {
  params: Promise<Params>;
};

// Seasons render on first request instead of at build time (no season is
// listed for prerendering), so a slow or rate-limited F1 API cannot hold up a
// deploy, and every year is a valid route. The empty list, rather than no
// `generateStaticParams` at all, is what makes the route ISR: without it Next
// treats the route as fully dynamic and renders every request (`no-store`).
export const generateStaticParams = (): Params[] => [];
export const dynamicParams = true;

// Caching is split in two. The API responses live in Next's data cache for
// 100 s (`API_REVALIDATE_SECONDS` in ergastF1Api.ts; only 200 responses are
// stored), so the API is hit at most once per 100 s per season however often
// the page is rendered. The rendered page itself is kept for 5 s: a render
// whose fetch was throttled shows the empty season for at most 5 s before it
// is retried, while a render whose fetch succeeded is regenerated from the
// data cache without touching the API. This is what the Pages Router did with
// `revalidate: fetchFailed ? 5 : 100`, which the App Router cannot express per
// render.
export const revalidate = 5;

export const generateMetadata = async ({
  params,
}: F1PageProps): Promise<Metadata> => {
  const { year } = await params;

  return pageMetadata({
    title: `F1 ${year} season results — Ben Werner`,
    description: `Cumulative driver points after every race of the ${year} Formula 1 season.`,
    path: `/f1/${year}`,
  });
};

const EMPTY_SEASON: ErgastApiSeasonRaceResults = {
  season: "",
  Races: [],
};

const F1Page = async ({ params }: F1PageProps) => {
  const { year } = await params;

  // a throttled or failed fetch renders an empty season (and, as nothing is
  // cached for it, is retried on the next render)
  const [seasonRaces, seasonRaceResults] = await Promise.all([
    fetchSeasonRaces({ year }).catch(() => EMPTY_SEASON),
    fetchSeasonRaceResults({ year }).catch(() => EMPTY_SEASON),
  ]);

  const seasonRaceResultsByDriver = groupResultsByDriver(
    seasonRaceResults.Races,
  );

  return (
    <Container sx={{ position: "relative" }}>
      <SeasonNavigation year={year} />
      {seasonRaceResultsByDriver.length > 0 ? (
        <DriverRaceResultsLineGraph
          year={year}
          seasonRaceResultsByDriver={seasonRaceResultsByDriver}
          seasonRaces={seasonRaces}
        />
      ) : (
        <Typography sx={{ mt: 4 }}>
          No race results are available for the {year} season yet.
        </Typography>
      )}
    </Container>
  );
};

export default F1Page;
