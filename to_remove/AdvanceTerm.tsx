import React, { PropsWithChildren, useContext, useEffect } from "react";
import { DateContext } from "../src/components/TimeHandler";
import { StartEndUnitType } from "../src/features/itemList/types";
import { DateTime } from "luxon";
import { advanceTerm } from "./advanceTerm";

interface IAdvanceTerm {
  term: StartEndUnitType;
  setTerm: React.Dispatch<React.SetStateAction<StartEndUnitType>>;
  isScopedToWorkingHours?: boolean;
}

export const AdvanceTerm = ({
  term,
  setTerm,
  isScopedToWorkingHours,
  children,
}: PropsWithChildren<IAdvanceTerm>) => {
  const date = useContext(DateContext);
  const currentTimeMillis = DateTime.fromISO(date).toMillis();
  useEffect(() => {
    if (currentTimeMillis > term.end) {
      advanceTerm(term, setTerm, currentTimeMillis, isScopedToWorkingHours);
    }
  }, [term, setTerm, currentTimeMillis, isScopedToWorkingHours]);

  return <>{children}</>;
};
