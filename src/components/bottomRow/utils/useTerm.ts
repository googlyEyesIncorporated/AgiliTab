import { UnitType, UnitTypes } from "../../../features/settings/types";
import { StartAndEnd } from "../../../app/commonTypes";
import { useEffect, useState } from "react";
import { calculateStartEndMs } from "./calculateStartEndMs";

/**
 * A custom hook that takes a term and returns a stateful value and a function to update it
 * @param savedTerm The term to be used as the basis for the start and end times
 * @returns {[StartAndEnd, React.Dispatch<React.SetStateAction<StartAndEnd>>]} a stateful value, and a function to update it
 */
export const useTerm = <T extends UnitTypes>(
  savedTerm: UnitType<T>,
  preformattedTerm?: StartAndEnd
): [StartAndEnd | null] => {
  const [term, setTerm] = useState(
    preformattedTerm ?? calculateStartEndMs(savedTerm)
  );
  useEffect(() => {
    setTerm(preformattedTerm ?? calculateStartEndMs(savedTerm));
  }, [savedTerm, preformattedTerm]);
  return [term];
};
