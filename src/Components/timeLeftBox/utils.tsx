import { DateTime, DurationObjectUnits } from "luxon";

type Predicate = (date: DateTime) => boolean;
export interface CalculatedTimes {
  start: number;
  end: number;
}

export const predicateDateRecalc = (
  date: DateTime,
  interval: DurationObjectUnits,
  predicate: Predicate
) => {
  let newDate = date;
  let lastDate;
  while (predicate(newDate)) {
    lastDate = newDate;
    newDate = newDate.plus(interval);
  }
  return { newDate, lastDate };
};

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

export const durationFormatter = (duration?: string) => {
  if (typeof duration === "string") {
    const [qty, unit] = duration.split(" ", 2);
    return { [unit]: parseInt(qty) } as DurationObjectUnits;
  }
};
