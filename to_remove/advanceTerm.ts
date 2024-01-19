import { DateTime } from "luxon";
import { StartEndUnitType } from "../src/features/itemList/types";
import { isNewDay } from "../src/features/utils/isNewDay";

const OneDay = { days: 1 };
const advanceTermGen = (termObject: StartEndUnitType) => {
  const duration = termObject.end - termObject.start;
  termObject.start = termObject.end + 1;
  termObject.end = termObject.start + duration;
};

const advanceWorkingHours = (termObject: StartEndUnitType) => {
  termObject.start = DateTime.fromMillis(termObject.start)
    .plus(OneDay)
    .toMillis();
  termObject.end = DateTime.fromMillis(termObject.end).plus(OneDay).toMillis();
};

/**
 * A function that updates the start and end properties of the term object, if the current time is past the end of the current day.
 * @param term the term object
 * @param setTerm a setState function
 * @param currentTimeMillis current time in milliseconds
 * @param isScopedToWorkingHours boolean value to indicate if daily hours should be scoped to working hours
 */
export const advanceTerm = (
  term: StartEndUnitType,
  setTerm: React.Dispatch<React.SetStateAction<StartEndUnitType>>,
  currentTimeMillis: number,
  isScopedToWorkingHours?: boolean
) => {
  const termCopy = { ...term };
  if (isScopedToWorkingHours) {
    if (isNewDay(currentTimeMillis)) {
      advanceWorkingHours(termCopy);
      setTerm(termCopy);
    }
  } else {
    advanceTermGen(termCopy);
    setTerm(termCopy);
  }
};
