import { DateTime } from "luxon";
import { calculateStartEndMs } from "./calculateStartEndMs";
import { UnitType } from "../../../features/itemList/types";

const Jan11970 = 0;
const Jan21970 = 86400000;

const commonParams = {
  startDate: DateTime.fromMillis(Jan11970).toISO() as string,
  list: [],
};

const paramsWithEndDate: UnitType<"date"> = {
  ...commonParams,
  title: "Params with end date",
  endDate: DateTime.fromMillis(Jan21970).toISO() as string,
  type: "date",
};

const paramsWithDuration: UnitType<"duration"> = {
  ...commonParams,
  title: "Params with duration",
  type: "duration",
  duration: { unit: "day", qty: 1 },
};

describe("calculateStartEndMs", () => {
  it("should calculate accurate end time based on end date", () => {
    expect(calculateStartEndMs(paramsWithEndDate)).toEqual({
      end: Jan21970,
      start: Jan11970,
    });
  });
  it("should calculate accurate end time based on duration", () => {
    expect(calculateStartEndMs(paramsWithDuration)).toEqual({
      end: Jan21970,
      start: Jan11970,
    });
  });
});
