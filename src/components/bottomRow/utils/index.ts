import { DateTime, DurationLikeObject } from "luxon";
import {
  UnitType,
  ScopedToWorkingHours,
} from "../../../features/settings/types";
import { StartEndUnitType } from "../../../features/itemList/types";
import {
  endOfToday,
  startOfToday,
} from "../../../features/settings/settingsSlice";

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
        recalcedDate.lastDate?.toMillis() ?? referencePoint.toMillis();
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
  const end = DateTime.fromISO(termData.endDate ?? "").toMillis();
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
 * A function that updates the start and end properties of the term object, if the current time is past the end of the current day.
 * @param currentTimeMillis current time in milliseconds
 * @param term the term object
 * @returns boolean indicating whether the term object was updated
 */
const advanceWorkingHours = (termObject: StartEndUnitType) => {
  termObject.start = DateTime.fromMillis(termObject.start)
    .plus({ days: 1 })
    .toMillis();
  termObject.end = DateTime.fromMillis(termObject.end)
    .plus({ days: 1 })
    .toMillis();
};

const advanceTermGen = (termObject: StartEndUnitType) => {
  const duration = termObject.end - termObject.start;
  termObject.start = termObject.end + 1;
  termObject.end = termObject.start + duration;
};

export const advanceTerm = (
  term: StartEndUnitType,
  setTerm: React.Dispatch<React.SetStateAction<StartEndUnitType>>,
  currentTimeMillis: number,
  isScopedToWorkingHours?: boolean
) => {
  if (term && setTerm) {
    if (currentTimeMillis > term.end) {
      if (isScopedToWorkingHours) {
        if (currentTimeMillis > endOfToday.toMillis()) {
          const termCopy = { ...term };
          advanceWorkingHours(termCopy);
          setTerm(termCopy);
        }
      } else {
        const termCopy = { ...term };
        advanceTermGen(termCopy);
        setTerm(termCopy);
      }
    }
  }
};

export { DraggableLists } from "./DraggableLists";
export { useShortTerm, useTerm } from "./hooks";
