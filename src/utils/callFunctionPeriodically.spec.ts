import { callFunctionPeriodically } from "./callFunctionPeriodically";

jest.setTimeout(15000);

describe("callFunctionPeriodically", () => {
  it("should call a function on an interval based on the specifiedPeriod", async () => {
    let count = 0;
    const countFn = () => {
      count++;
    };
    callFunctionPeriodically(1100, countFn);
    await new Promise((r) => setTimeout(r, 3000));
    expect(count).toBe(2);
  });

  it("should clear the interval when the return function is called", async () => {
    let count = 0;
    const countFn = () => {
      count++;
    };
    const clearInterval = callFunctionPeriodically(1100, countFn);
    await new Promise((r) => setTimeout(r, 3500));
    expect(count).toBe(3);
    clearInterval();

    await new Promise((r) => setTimeout(r, 2500));
    expect(count).toBe(3); // No increase after clearing the interval
  });
});
