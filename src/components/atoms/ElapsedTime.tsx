import { useContext, useEffect } from "react";
import { DateContext } from "../TimeHandler";
import { StartEndUnitType } from "../../features/itemList/types";
import { getCurrentRatio } from "../bottomRow/utils";
import { DateTime } from "luxon";

interface IElapsedTime {
  term?: StartEndUnitType;
  setTerm: React.Dispatch<React.SetStateAction<StartEndUnitType>>;
  advanceTerm: (...props: any) => void;
  isScopedToWorkingHours?: boolean;
}

export const ElapsedTime = ({
  term,
  setTerm,
  advanceTerm,
  isScopedToWorkingHours,
}: IElapsedTime) => {
  const date = useContext(DateContext);
  const currentTimeMillis = DateTime.fromISO(date).toMillis();
  useEffect(() => {
    advanceTerm(term, setTerm, currentTimeMillis, isScopedToWorkingHours);
  }, [term, setTerm, currentTimeMillis, isScopedToWorkingHours, advanceTerm]);

  if (term) {
    return (
      <span style={{ float: "right" }}>{getCurrentRatio(term) + "%"}</span>
    );
  }
  return null;
};
