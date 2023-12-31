import { DateTime } from "luxon";
import { CalculatedTimes } from "./calculateStartEndMs";

const MaxPercentage = 100;
const MinPercentage = 0;
const PercentScaler = 100;

export const getCurrentRatio = ({ start, end }: CalculatedTimes) => {
  const timeElapsed = DateTime.now().toMillis() - start;
  const totalTime = end - start;
  const ratio = timeElapsed / totalTime;
  if (totalTime) {
    return Math.min(
      Math.max(Math.floor(ratio * PercentScaler), MinPercentage),
      MaxPercentage
    );
  }
  return NaN;
};
