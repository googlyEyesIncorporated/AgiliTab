import React, { PropsWithChildren, useContext, useEffect } from "react";
import { DateContext } from "../TimeHandler";
import { StartEndUnitType } from "../../features/itemList/types";
import { advanceTerm, getCurrentRatio } from "../bottomRow/utils";
import { DateTime } from "luxon";

interface IAdvanceTerm {
  term: StartEndUnitType;
  setTerm: React.Dispatch<React.SetStateAction<StartEndUnitType>>;
  isScopedToWorkingHours?: boolean;
}

interface IElapsedTime extends IAdvanceTerm {
  className?: string;
}

const AdvanceTerm = ({
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

export const ElapsedTime = ({
  term,
  setTerm,
  isScopedToWorkingHours,
  className,
}: IElapsedTime) => (
  <AdvanceTerm
    setTerm={setTerm}
    isScopedToWorkingHours={isScopedToWorkingHours}
    term={term}
  >
    <span className={`float-right ${className}`}>
      {getCurrentRatio(term) + "%"}
    </span>
  </AdvanceTerm>
);
