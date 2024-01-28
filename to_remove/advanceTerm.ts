import { StartEndUnitType } from "../src/features/itemList/types";

export const advanceTermGen = (termObject: StartEndUnitType) => {
  const duration = termObject.end - termObject.start;
  termObject.start = termObject.end + 1;
  termObject.end = termObject.start + duration;
};
