import { DurationState } from "../types";
import { saveTerm } from "../utils";

const mockDispatch = jest.fn();

const commonParams = {
  title: "test",
  unitType: "Duration Type",
  startDate: "startDate",
  groupId: 1,
  endDate: "endDate",
};

const durationParams = {
  ...commonParams,
  isDuration: true,
  duration: { unit: "days", qty: 1 },
};

const endDateParams = {
  ...commonParams,
  isDuration: false,
  duration: {} as DurationState,
};

const expectedDurationDispatch = {
  payload: {
    key: 1,
    termObj: {
      duration: durationParams.duration,
      isDuration: durationParams.isDuration,
      startDate: durationParams.startDate,
      title: durationParams.title,
      unitType: durationParams.unitType,
    },
  },
  type: "units/setNotShortTerm",
};

const expectedEndDateDispatch = {
  payload: {
    key: 1,
    termObj: {
      isDuration: endDateParams.isDuration,
      startDate: endDateParams.startDate,
      endDate: endDateParams.endDate,
      title: endDateParams.title,
      unitType: endDateParams.unitType,
    },
  },
  type: "units/setNotShortTerm",
};

describe("saveTerm", () => {
  it("should dispatch a unit setting action with duration", () => {
    saveTerm({ enabled: true, dispatch: mockDispatch, ...durationParams });
    expect(mockDispatch).toHaveBeenCalledWith(expectedDurationDispatch);
  });

  it("should dispatch a unit setting action with end date", () => {
    saveTerm({ enabled: true, dispatch: mockDispatch, ...endDateParams });
    expect(mockDispatch).toHaveBeenCalledWith(expectedEndDateDispatch);
  });
});
