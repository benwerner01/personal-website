// Gallery types and helpers that are safe to import from client code.
//
// Anything that touches the filesystem (`fs`, `image-size`) lives in
// `./gallery.ts` and must only be imported from `getStaticProps` /
// `getStaticPaths`, so that it is stripped from the browser bundle.

export type CollectionImage = {
  variant: "image";
  blurDataURL?: string;
  slug: string;
  width: number;
  height: number;
};

export type CollectionItem = CollectionImage;

export type Collection = {
  name: string;
  slug: string;
  startDate: string;
  endDate: string;
  items: CollectionItem[];
};

export type StaticCollection = Omit<Collection, "items">;

export type Gallery = Collection[];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatCollectionTimeRange = (collection: Collection) => {
  const startDate = new Date(collection.startDate);
  const endDate = new Date(collection.endDate);

  return [
    MONTHS[startDate.getUTCMonth()],
    startDate.getUTCFullYear() === endDate.getUTCFullYear()
      ? ""
      : [
          ` ${startDate.getUTCFullYear()}`,
          startDate.getUTCMonth() !== endDate.getUTCMonth()
            ? ""
            : ` - ${MONTHS[endDate.getUTCMonth()]}`,
        ].join(""),
    startDate.getUTCMonth() === endDate.getUTCMonth()
      ? ""
      : ` - ${MONTHS[endDate.getUTCMonth()]}`,
    ` ${endDate.getUTCFullYear()}`,
  ].join("");
};

export const STATIC_COLLECTIONS: StaticCollection[] = [
  {
    name: "Burning Man 2022",
    slug: "burning-man-2022",
    startDate: new Date("2022-08-23").toISOString(),
    endDate: new Date("2022-09-04").toISOString(),
  },
  {
    name: "London Lockdown",
    slug: "london-lockdown",
    startDate: new Date("2020-05").toISOString(),
    endDate: new Date("2020-06").toISOString(),
  },
  {
    name: "NYC Lockdown",
    slug: "nyc-lockdown",
    startDate: new Date("2020-03").toISOString(),
    endDate: new Date("2020-05").toISOString(),
  },
];
