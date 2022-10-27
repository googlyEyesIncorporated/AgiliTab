import { CountDown } from "./CountDown";
import { DateTime } from "luxon";
import { UnitType } from "../../types";
import { useSelector } from "react-redux";
import { selectAllUnits } from "../../features/counter/unitsSlice";

const getCurrentRatio = (unitObj: UnitType) => {
  const startDate = DateTime.fromISO(unitObj.startDate);
  const timeInUnit = DateTime.fromISO(unitObj.endDate).diff(
    startDate
  ).milliseconds;
  const timeElapsed = DateTime.now().diff(startDate).milliseconds;
  return Math.floor((timeElapsed / timeInUnit) * 100);
};

export const TimeLeft = () => {
  const { shortTerm, mediumTerm, longTerm } = useSelector(selectAllUnits);
  return (
    <div className="time-left" id="countdownbox">
      <div className="countdown-title">Time Elapsed:</div>
      <div className="countdowns" id="countdownbox-justifier">
        <CountDown ratio={getCurrentRatio(shortTerm)} unit={"day"} />
        {mediumTerm && (
          <CountDown
            ratio={getCurrentRatio(mediumTerm)}
            unit={mediumTerm?.unitType || "sprint"}
          />
        )}
        {longTerm && (
          <CountDown
            ratio={getCurrentRatio(longTerm)}
            unit={longTerm?.unitType || "quarter"}
          />
        )}
      </div>
    </div>
  );
};
