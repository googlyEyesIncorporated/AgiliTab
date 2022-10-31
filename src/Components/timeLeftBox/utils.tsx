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

export const getCurrentRatio = (
  { start, end }: CalculatedTimes,
  setNeedsAdjustment: (value: React.SetStateAction<boolean>) => void
) => {
  const timeElapsed = DateTime.now().toMillis() - start;
  const totalTime = end - start;
  const ratio = timeElapsed / totalTime;
  if (ratio > 1 && ratio !== Infinity) {
    setNeedsAdjustment(true);
  }
  if (totalTime) {
    return Math.floor(ratio * 100);
  }
  return NaN;
};

export const dateIsPast = (date: DateTime) => date.diffNow().toMillis() < 0;

export const durationFormatter = (duration?: string) => {
  if (typeof duration === "string") {
    const [qty, unit] = duration.split(" ", 2);
    return { [unit]: parseInt(qty) } as DurationObjectUnits;
  }
};
