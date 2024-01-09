import { DateTime } from "luxon";
import { CalculatedTimes } from "./calculateStartEndMs";

const PercentScaler = 100;

const minMaxRange = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const getRatioOfTimeElapsed = (
  start: number,
  now: number,
  end: number
) => (now - start) / (end - start); // timeElapsed/totalTime

export const getCurrentRatio = (
  { start, end }: CalculatedTimes,
  shouldCapToRange = true
) => {
  if (end !== start) {
    const ratio = getRatioOfTimeElapsed(start, DateTime.now().toMillis(), end);
    const percent = Math.round(ratio * PercentScaler);
    return shouldCapToRange ? minMaxRange(percent, 0, 100) : percent;
  }
  return NaN;
};
