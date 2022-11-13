import { DateTime, DurationLikeObject } from "luxon";
import { UnitType, ScopedToWorkingHours } from "../../features/Settings/types";

type Predicate = (date: DateTime, otherDate: DateTime) => boolean;
export interface CalculatedTimes {
  start: number;
  end: number;
}

export const predicateDateRecalc = (
  date: DateTime,
  interval: DurationLikeObject,
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

// const durationCalculator = (start: string, end: string) => {
//   return DateTime.fromISO(end).diff(DateTime.fromISO(start));
// };

const dateIsPastOtherDate = (date: DateTime, otherDate: DateTime) =>
  date.toMillis() <= otherDate.toMillis();

export const calculateStartEndMs = (
  termData: (UnitType & ScopedToWorkingHours) | UnitType
) => {
  const referencePoint = DateTime.fromISO(termData.startDate);
  if (termData.duration && termData.isDuration) {
    const duration = { [termData.duration.unit]: termData.duration.qty };
    if (termData.repeat) {
      const recalcedDate = predicateDateRecalc(
        referencePoint,
        duration,
        dateIsPastOtherDate,
        DateTime.now()
      );
      const end = recalcedDate.newDate.toMillis();
      const start =
        recalcedDate.lastDate?.toMillis() || referencePoint.toMillis();
      if (start === end) {
        const newEnd = predicateDateRecalc(
          DateTime.fromMillis(end),
          duration || {},
          dateIsPastOtherDate,
          DateTime.fromMillis(start)
        ).newDate.toMillis();
        return { end: newEnd, start, unitType: termData.unitType };
      }
      return { end, start, unitType: termData.unitType };
    }
    const end = DateTime.fromISO(termData.startDate).plus(duration).toMillis();
    return {
      end,
      start: referencePoint.toMillis(),
      unitType: termData.unitType,
    };
  }
  // If not repeat
  const end = DateTime.fromISO(termData.endDate || "").toMillis();
  return { end, start: referencePoint.toMillis(), unitType: termData.unitType };
};
