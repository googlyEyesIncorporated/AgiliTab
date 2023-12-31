import { DateTime, DurationLikeObject } from "luxon";
import {
  UnitType,
  ScopedToWorkingHours,
} from "../../../features/settings/types";

export interface CalculatedTimes {
  start: number;
  end: number;
}

const recalcDateIfInPast = (
  date: DateTime,
  interval: DurationLikeObject,
  otherDate: DateTime
) => {
  let newDate = date;
  let lastDate;
  while (dateIsPastOtherDate(newDate, otherDate)) {
    lastDate = newDate;
    newDate = newDate.plus(interval);
  }
  return { newDate, lastDate };
};

const dateIsPastOtherDate = (date: DateTime, otherDate: DateTime) =>
  date.toMillis() <= otherDate.toMillis();

/**
 *
 * @param termData
 * @returns
 */
export const calculateStartEndMs = (
  termData: (UnitType & ScopedToWorkingHours) | UnitType
) => {
  // DateTime object created from termData.startDate
  const referencePoint = DateTime.fromISO(termData.startDate);
  // object with unitType
  const commonObj = { unitType: termData.unitType };
  // If based on duration and not an end date
  if (termData.duration && termData.isDuration) {
    const duration = { [termData.duration.unit]: termData.duration.qty };
    if (termData.repeat) {
      const recalcedDate = recalcDateIfInPast(
        referencePoint,
        duration,
        DateTime.now()
      );
      const end = recalcedDate.newDate.toMillis();
      const start =
        recalcedDate.lastDate?.toMillis() ?? referencePoint.toMillis();
      if (start === end) {
        const newEnd = recalcDateIfInPast(
          DateTime.fromMillis(end),
          duration ?? {},
          DateTime.fromMillis(start)
        ).newDate.toMillis();
        return { ...commonObj, end: newEnd, start };
      }
      return { ...commonObj, end, start };
    }
    const end = DateTime.fromISO(termData.startDate).plus(duration).toMillis();
    return {
      ...commonObj,
      end,
      start: referencePoint.toMillis(),
    };
  }
  // If not repeat
  const end = DateTime.fromISO(termData.endDate ?? "").toMillis();
  return { ...commonObj, end, start: referencePoint.toMillis() };
};
