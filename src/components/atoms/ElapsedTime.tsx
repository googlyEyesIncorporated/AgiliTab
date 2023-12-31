import React, { PropsWithChildren, useContext, useEffect } from "react";
import { DateContext } from "../TimeHandler";
import { StartEndUnitType } from "../../features/itemList/types";
import { getCurrentRatio } from "../bottomRow/utils";
import { DateTime } from "luxon";

interface IAdvanceTerm {
  term: StartEndUnitType;
  setTerm: React.Dispatch<React.SetStateAction<StartEndUnitType>>;
  advanceTerm: (...props: any) => void;
  isScopedToWorkingHours?: boolean;
}

interface IElapsedTime extends IAdvanceTerm {
  className?: string;
}

const AdvanceTerm = ({
  term,
  setTerm,
  advanceTerm,
  isScopedToWorkingHours,
  children,
}: PropsWithChildren<IAdvanceTerm>) => {
  const date = useContext(DateContext);
  const currentTimeMillis = DateTime.fromISO(date).toMillis();
  useEffect(() => {
    advanceTerm(term, setTerm, currentTimeMillis, isScopedToWorkingHours);
  }, [term, setTerm, currentTimeMillis, isScopedToWorkingHours, advanceTerm]);

  return <>{children}</>;
};

export const ElapsedTime = ({
  term,
  setTerm,
  advanceTerm,
  isScopedToWorkingHours,
  className,
}: IElapsedTime) => (
  <AdvanceTerm
    setTerm={setTerm}
    advanceTerm={advanceTerm}
    isScopedToWorkingHours={isScopedToWorkingHours}
    term={term}
  >
    <span className={`float-right ${className}`}>
      {getCurrentRatio(term) + "%"}
    </span>
  </AdvanceTerm>
);
