import React, { PropsWithChildren, useContext, useEffect } from "react";
import { DateContext } from "../src/components/TimeProvider";
import { StartEndUnitType } from "../src/features/itemList/types";
import { DateTime } from "luxon";
import { advanceTermGen } from "./advanceTerm";

interface IAdvanceTerm {
  term: StartEndUnitType;
  setTerm: React.Dispatch<React.SetStateAction<StartEndUnitType>>;
}

export const AdvanceTerm = ({
  term,
  setTerm,
  children,
}: PropsWithChildren<IAdvanceTerm>) => {
  const date = useContext(DateContext);
  const currentTimeMillis = DateTime.fromISO(date).toMillis();
  useEffect(() => {
    if (currentTimeMillis > term.end) {
      const termCopy = { ...term };

      advanceTermGen(termCopy);
      setTerm(termCopy);
    }
  }, [term, setTerm, currentTimeMillis]);

  return <>{children}</>;
};
