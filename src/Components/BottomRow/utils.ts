import { DateTime, DurationLikeObject } from "luxon";
import { UnitType, ScopedToWorkingHours } from "../../features/Settings/types";
import { StartEndUnitType } from "../../features/itemList/types";
import {
  endOfToday,
  startOfToday,
} from "../../features/Settings/settingsSlice";
import { useEffect, useState } from "react";

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
  const end = DateTime.fromISO(termData.endDate || "").toMillis();
  return { ...commonObj, end, start: referencePoint.toMillis() };
};

export const getRelativeDay = (
  isScopedToWorkingHours: boolean,
  workDayEnd: number,
  workDayStart: number
) => {
  if (isScopedToWorkingHours) {
    return {
      start: workDayStart,
      end: workDayEnd,
      unitType: "work day",
    };
  } else {
    return {
      start: startOfToday.toMillis(),
      end: endOfToday.toMillis(),
      unitType: "day",
    };
  }
};

/**
 * A custom hook that takes a term and returns a stateful value and a function to update it
 * @param savedTerm The term to be used as the basis for the start and end times
 * @returns {[StartEndUnitType, React.Dispatch<React.SetStateAction<StartEndUnitType>>]} a stateful value, and a function to update it
 */
export const useTerm = (
  savedTerm: UnitType,
  preformattedTerm?: StartEndUnitType
): [
  StartEndUnitType,
  React.Dispatch<React.SetStateAction<StartEndUnitType>>
] => {
  const [term, setTerm] = useState(
    preformattedTerm || calculateStartEndMs(savedTerm)
  );
  useEffect(() => {
    setTerm(preformattedTerm || calculateStartEndMs(savedTerm));
  }, [savedTerm, preformattedTerm]);
  return [term, setTerm];
};