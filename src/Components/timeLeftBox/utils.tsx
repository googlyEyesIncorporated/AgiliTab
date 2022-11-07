import { DateTime, DurationObjectUnits } from "luxon";
import {
  ScopedToWorkingHours,
  UnitType,
  Duration,
} from "../../features/general/types";

type Predicate = (date: DateTime, otherDate: DateTime) => boolean;
export interface CalculatedTimes {
  start: number;
  end: number;
}

export const predicateDateRecalc = (
  date: DateTime,
  interval: DurationObjectUnits,
  predicate: Predicate,
  otherDate: DateTime
) => {
  let newDate = date;
  let lastDate;
  while (predicate(newDate, otherDate)) {
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

export const durationFormatter = (duration?: Duration) => {
  if (duration) {
    const { qty, unit } = duration;
    return { [unit]: qty } as DurationObjectUnits;
  }
};

const dateIsPastOtherDate = (date: DateTime, otherDate: DateTime) =>
  date.toMillis() <= otherDate.toMillis();

export const calculateStartEndMs = (
  savedShortTerm: (UnitType & ScopedToWorkingHours) | UnitType
) => {
  const referencePoint = DateTime.fromISO(savedShortTerm.startDate);
  const duration = durationFormatter(savedShortTerm.duration);
  const recalcedDate = predicateDateRecalc(
    referencePoint,
    duration || {},
    dateIsPastOtherDate,
    DateTime.now()
  );
  const end = recalcedDate.newDate.toMillis();
  const start = recalcedDate.lastDate?.toMillis() || referencePoint.toMillis();
  if (start === end) {
    const newEnd = predicateDateRecalc(
      DateTime.fromMillis(end),
      duration || {},
      dateIsPastOtherDate,
      DateTime.fromMillis(start)
    ).newDate.toMillis();
    return { end: newEnd, start, unitType: savedShortTerm.unitType };
  }
  return { end, start, unitType: savedShortTerm.unitType };
};
