import { DateTime } from "luxon";
import { StartEndUnitType } from "../../../features/itemList/types";
import { endOfToday } from "../../../features/settings/settingsSlice";

const advanceTermGen = (termObject: StartEndUnitType) => {
  const duration = termObject.end - termObject.start;
  termObject.start = termObject.end + 1;
  termObject.end = termObject.start + duration;
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
