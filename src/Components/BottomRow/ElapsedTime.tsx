import { useContext, useEffect } from "react";
import { DateContext } from "../../TimeHandler";
import { StartEndUnitType } from "../../features/itemList/types";
import { getCurrentRatio } from "./utils";
import { DateTime } from "luxon";

interface IElapsedTime {
  term?: StartEndUnitType;
  setTerm: React.Dispatch<React.SetStateAction<StartEndUnitType>>;
}

export const ElapsedTime = ({ term, setTerm }: IElapsedTime) => {
  const date = useContext(DateContext);
  useEffect(() => {
    const currentTimeMillis = DateTime.fromISO(date).toMillis();

    if (term && setTerm) {
      if (currentTimeMillis > term.end) {
        const termCopy = { ...term };
        const duration = term.end - term.start;
        termCopy.start = term.end + 1;
        termCopy.end = termCopy.start + duration;
        setTerm(termCopy);
      }
    }
  }, [term, setTerm, date]);

  if (term) {
    return (
      <span style={{ float: "right" }}>{getCurrentRatio(term) + "%"}</span>
    );
  }
  return null;
};
