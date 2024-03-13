import { DateTime } from "luxon";
import { DurationObj } from "../../../features/itemList/types";

export const getRatioOfTimeElapsed = (
  start: number,
  now: number,
  end: number
) => (now - start) / (end - start); // timeElapsed/totalTime

export const getCurrentRatio = <T extends DurationObj | undefined>(
  { startDate: start, endDate: end, duration }: DurationOrDate<T>,
  shouldCapToRange = true
) => {
  const startDate = DateTime.fromISO(start);
  let endDate = end && DateTime.fromISO(end);
  if (duration) {
    endDate = startDate.plus({ [duration.unit]: duration.qty });
  }
  if (endDate && endDate !== startDate) {
    const ratio = getRatioOfTimeElapsed(
      startDate.toMillis(),
      DateTime.now().toMillis(),
      endDate.toMillis()
    );
    const ratiox100 = Math.floor(ratio * 100);
    const percentage = shouldCapToRange ? Math.min(ratiox100, 100) : ratiox100;
    return Math.max(percentage, 0);
  }
  return NaN;
};

interface Common {
  startDate: string;
}

export interface EndDate extends Common {
  endDate?: string;
  duration?: undefined;
}

export interface Duration<T extends DurationObj | undefined> extends Common {
  duration?: T;
  endDate: undefined;
}

export type DurationOrDate<T extends DurationObj | undefined> =
  T extends undefined ? EndDate : Duration<DurationObj>;
