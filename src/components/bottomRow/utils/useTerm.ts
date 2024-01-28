import { UnitType } from "../../../features/settings/types";
import { StartEndUnitType } from "../../../features/itemList/types";
import { useEffect, useState } from "react";
import { calculateStartEndMs } from "./calculateStartEndMs";

/**
 * A custom hook that takes a term and returns a stateful value and a function to update it
 * @param savedTerm The term to be used as the basis for the start and end times
 * @returns {[StartEndUnitType, React.Dispatch<React.SetStateAction<StartEndUnitType>>]} a stateful value, and a function to update it
 */
export const useTerm = <T extends boolean>(
  savedTerm: UnitType<T>,
  preformattedTerm?: StartEndUnitType
): [StartEndUnitType] => {
  const [term, setTerm] = useState(
    preformattedTerm ?? calculateStartEndMs(savedTerm)
  );
  useEffect(() => {
    setTerm(preformattedTerm ?? calculateStartEndMs(savedTerm));
  }, [savedTerm, preformattedTerm]);
  return [term];
};
