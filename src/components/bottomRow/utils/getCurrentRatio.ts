import { DateTime } from "luxon";
import { StartAndEnd } from "../../../app/commonTypes";

export const getRatioOfTimeElapsed = (
  start: number,
  now: number,
  end: number
) => (now - start) / (end - start); // timeElapsed/totalTime

export const getCurrentRatio = (
  { start, end }: StartAndEnd,
  shouldCapToRange = true
) => {
  if (end !== start) {
    const ratio = getRatioOfTimeElapsed(start, DateTime.now().toMillis(), end);
    const ratiox100 = Math.floor(ratio * 100);
    const percentage = shouldCapToRange ? Math.min(ratiox100, 100) : ratiox100;
    return Math.max(percentage, 0);
  }
  return NaN;
};
