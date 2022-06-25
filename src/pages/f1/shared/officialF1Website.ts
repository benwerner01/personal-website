import axios from "axios";
import { parse } from "node-html-parser";

const baseUrl = "https://www.formula1.com";

type ScrapedRaceResult = {
  position: string;
  driverName: string;
  driverCode: string;
  constructorName: string;
  points: string;
};

export const scrapeRaceResults = async (params: {
  raceResultsUrl: string;
}): Promise<ScrapedRaceResult[]> => {
  const { data: rawHTML } = await axios.get(params.raceResultsUrl);
  const root = parse(rawHTML);

  return root
    .querySelectorAll("table.resultsarchive-table > tbody > tr")
    .map((tableRow) => {
      const cells = tableRow.querySelectorAll("td");

      const position = cells[1].text;
      const cell3StructuredTextWords = cells[3].structuredText
        .trim()
        .split(" ");
      const driverName = cell3StructuredTextWords.slice(0, -1).join(" ");
      const driverCode = cell3StructuredTextWords.slice(-1)[0];
      const constructorName = cells[4].structuredText;
      const points = cells[7].text;

      return { position, driverName, driverCode, constructorName, points };
    });
};

type ScrapedRace = {
  name: string;
  stringifiedDate: string;
  raceResultsUrl: string;
};

export const scrapeSeasonRaces = async (params: {
  year: string;
}): Promise<ScrapedRace[]> => {
  const { data: seasonCompletedRacesHtml } = await axios.get(
    `https://www.formula1.com/en/results.html/${params.year}/races.html`
  );

  return parse(seasonCompletedRacesHtml)
    .querySelectorAll("table.resultsarchive-table > tbody > tr")
    .map((tableRow) => {
      const cells = tableRow.querySelectorAll("td");
      const raceNameCell = cells[1];
      const name = raceNameCell.structuredText.trim();
      const raceNameHref = raceNameCell.querySelector("a").getAttribute("href");

      const raceResultsUrl = raceNameHref.startsWith("/")
        ? `${baseUrl}${raceNameHref}`
        : raceNameHref;

      const stringifiedDate = cells[2].text;
      return { name, raceResultsUrl, stringifiedDate };
    });
};

type RaceWithResults = {
  results: ScrapedRaceResult[];
} & ScrapedRace;

export const fetchSeasonRaceResults = async (params: {
  year: string;
}): Promise<RaceWithResults[]> => {
  const { year } = params;
  const seasonRaces = await scrapeSeasonRaces({ year });

  return await Promise.all(
    seasonRaces.map(async (race) => ({
      ...race,
      results: await scrapeRaceResults(race),
    }))
  );
};
