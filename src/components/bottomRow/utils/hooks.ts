import { DateTime } from "luxon";
import { UnitType } from "../../../features/settings/types";
import { StartEndUnitType } from "../../../features/itemList/types";
import {
  selectWorkDayToggle,
  selectWorkingHours,
} from "../../../features/settings/settingsSlice";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { calculateStartEndMs, getRelativeDay } from ".";

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

export const useShortTerm = (): [
  StartEndUnitType,
  React.Dispatch<React.SetStateAction<StartEndUnitType>>,
  boolean
] => {
  const isScopedToWorkingHours = useAppSelector(selectWorkDayToggle);
  const {
    times: { start, end },
  } = useAppSelector(selectWorkingHours);
  const workDayStart = DateTime.fromFormat(start, "T").toMillis();
  const workDayEnd = DateTime.fromFormat(end, "T").toMillis();

  const [shortTerm, setShortTerm] = useState(
    getRelativeDay(isScopedToWorkingHours, workDayEnd, workDayStart)
  );
  useEffect(() => {
    setShortTerm(
      getRelativeDay(isScopedToWorkingHours, workDayEnd, workDayStart)
    );
  }, [isScopedToWorkingHours, workDayStart, workDayEnd]);
  return [shortTerm, setShortTerm, isScopedToWorkingHours];
};
