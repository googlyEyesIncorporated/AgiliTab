import React, { PropsWithChildren, useContext, useEffect } from "react";
import { DateContext } from "../TimeHandler";
import { StartEndUnitType } from "../../features/itemList/types";
import { advanceTerm } from "../bottomRow/utils";
import { DateTime } from "luxon";

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
