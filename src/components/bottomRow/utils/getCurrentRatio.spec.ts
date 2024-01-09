import { getCurrentRatio, getRatioOfTimeElapsed } from "./getCurrentRatio";
import { epochTimes } from "../../../commonTestData.json";

const { Sep012023, Sep082023, Sep152023, Sep232023, Sep302023 } = epochTimes;
const jestSetTime = (newDateTime: number) => {
  jest.useFakeTimers().setSystemTime(new Date(newDateTime));
};

describe("getRatioOfTimeElapsed", () => {
  // (now - start) / (end - start)  (timeElapsed/totalTime)
  it("should return 0", () => {
    expect(getRatioOfTimeElapsed(0, 0, 100)).toBe(0);
    expect(getRatioOfTimeElapsed(Sep012023, Sep012023, Sep302023)).toBe(0);
  });

  it("should return .25", () => {
    expect(getRatioOfTimeElapsed(0, 25, 100)).toBe(0.25);
    expect(getRatioOfTimeElapsed(Sep012023, Sep082023, Sep302023)).toBe(0.25);
  });
  it("should return .5", () => {
    expect(getRatioOfTimeElapsed(0, 50, 100)).toBe(0.5);
    expect(getRatioOfTimeElapsed(Sep012023, Sep152023, Sep302023)).toBe(0.5);
  });
  it("should return .75", () => {
    expect(getRatioOfTimeElapsed(0, 75, 100)).toBe(0.75);
    expect(getRatioOfTimeElapsed(Sep012023, Sep232023, Sep302023)).toBe(0.75);
  });
  it("should return 1", () => {
    expect(getRatioOfTimeElapsed(0, 100, 100)).toBe(1);
    expect(getRatioOfTimeElapsed(Sep012023, Sep302023, Sep302023)).toBe(1);
  });
});

describe("getCurrentRatio", () => {
  it("should return 0", () => {
    jestSetTime(Sep012023);
    expect(
      getCurrentRatio({
        start: Sep012023,
        end: Sep302023,
      })
    ).toBe(0);
  });
  it("should return 25", () => {
    jestSetTime(Sep082023);
    expect(
      getCurrentRatio({
        start: Sep012023,
        end: Sep302023,
      })
    ).toBe(25);
  });
  it("should return 50", () => {
    jestSetTime(Sep152023);
    expect(
      getCurrentRatio({
        start: Sep012023,
        end: Sep302023,
      })
    ).toBe(50);
  });
  it("should return 50", () => {
    jestSetTime(Sep232023);
    expect(
      getCurrentRatio({
        start: Sep012023,
        end: Sep302023,
      })
    ).toBe(75);
  });
  it("should return 100", () => {
    jestSetTime(Sep302023);
    expect(
      getCurrentRatio({
        start: Sep012023,
        end: Sep302023,
      })
    ).toBe(100);
  });
});
