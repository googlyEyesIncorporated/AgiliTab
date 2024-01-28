import { renderHook } from "@testing-library/react";
import { useTerm } from "./useTerm";
import { DateTime } from "luxon";
import { UnitType } from "../../../features/settings/types";

const Jan11970 = 0;
const Jan21970 = 86400000;

const commonParams = {
  startDate: DateTime.fromMillis(Jan11970).toISO() as string,
  unitType: "test",
};

const paramsWithEndDate: UnitType<false> = {
  ...commonParams,
  title: "Params with end date",
  endDate: DateTime.fromMillis(Jan21970).toISO() as string,
  isDuration: false,
};

const expectedUnitType = {
  end: Jan21970,
  start: Jan11970,
  unitType: commonParams.unitType,
};

describe("useTerm", () => {
  it("should return an object with end, start and unitType", () => {
    const { result } = renderHook(() => useTerm(paramsWithEndDate));
    expect(result).toEqual({
      current: [expectedUnitType],
    });
  });

  it("should initiate with a preformatted term if provided", () => {
    const altExpectedUnitType = {
      end: Jan11970,
      start: Jan21970,
      unitType: expectedUnitType.unitType,
    };
    const { result } = renderHook(() =>
      useTerm(paramsWithEndDate, altExpectedUnitType)
    );
    expect(result).toEqual({
      current: [altExpectedUnitType],
    });
  });
});
