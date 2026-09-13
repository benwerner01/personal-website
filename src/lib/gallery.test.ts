import { afterEach, describe, expect, it } from "vitest";
import {
  Collection,
  formatCollectionTimeRange,
  STATIC_COLLECTIONS,
} from "./gallery-shared";

const collection = (startDate: string, endDate: string): Collection => ({
  name: "Test",
  slug: "test",
  startDate,
  endDate,
  items: [],
});

// Noon UTC keeps the calendar day (and month) the same in every timezone
// within UTC-12..UTC+11, so these cases are independent of the process TZ.
const noon = (day: string) => `${day}T12:00:00.000Z`;

describe("formatCollectionTimeRange", () => {
  it("shows a single month and year when both dates fall in the same month", () => {
    expect(
      formatCollectionTimeRange(
        collection(noon("2022-08-23"), noon("2022-08-30")),
      ),
    ).toBe("Aug 2022");
  });

  it("shows both months and one year for a range within a year", () => {
    expect(
      formatCollectionTimeRange(
        collection(noon("2022-08-23"), noon("2022-09-04")),
      ),
    ).toBe("Aug - Sep 2022");
  });

  it("shows both months and years for a range that crosses a year", () => {
    expect(
      formatCollectionTimeRange(
        collection(noon("2019-12-15"), noon("2020-01-10")),
      ),
    ).toBe("Dec 2019 - Jan 2020");
  });

  it("repeats the month when the same month spans different years", () => {
    expect(
      formatCollectionTimeRange(
        collection(noon("2019-03-15"), noon("2020-03-15")),
      ),
    ).toBe("Mar 2019 - Mar 2020");
  });

  describe("static collections dated at UTC midnight", () => {
    const originalTimezone = process.env.TZ;

    afterEach(() => {
      if (originalTimezone === undefined) {
        delete process.env.TZ;
      } else {
        process.env.TZ = originalTimezone;
      }
    });

    const format = () =>
      STATIC_COLLECTIONS.map((staticCollection) =>
        formatCollectionTimeRange({ ...staticCollection, items: [] }),
      );

    it("formats by UTC month in a UTC process", () => {
      process.env.TZ = "UTC";

      expect(format()).toEqual([
        "Aug - Sep 2022",
        "May - Jun 2020",
        "Mar - May 2020",
      ]);
    });

    // a local-time getter would read the previous month here ("Apr - May
    // 2020"), which is what visitors in the Americas used to see
    it("formats by UTC month in a process west of UTC", () => {
      process.env.TZ = "America/Los_Angeles";

      expect(format()).toEqual([
        "Aug - Sep 2022",
        "May - Jun 2020",
        "Mar - May 2020",
      ]);
    });
  });
});
