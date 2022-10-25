import React from "react";
import { CountDown } from "./CountDown";
import { DateTime } from "luxon";
import { UnitType } from "../../types";
import { useSelector } from "react-redux";
import { selectAllUnits } from "../../features/counter/unitsSlice";

const getCurrentRatio = (unitObj: UnitType) => {
  const timeInUnit = unitObj.endDate.diff(unitObj.startDate).milliseconds;
  const timeElapsed = DateTime.now().diff(unitObj.startDate).milliseconds;
  return Math.floor((timeElapsed / timeInUnit) * 100);
};

export const TimeLeft = () => {
  const { firstUnit, secondUnit, thirdUnit } = useSelector(selectAllUnits);
  return (
    <div className="time-left" id="countdownbox">
      <div className="countdown-title">Time Elapsed:</div>
      <div className="countdowns" id="countdownbox-justifier">
        <CountDown ratio={getCurrentRatio(firstUnit)} unit={"day"} />
        {secondUnit && (
          <CountDown
            ratio={getCurrentRatio(secondUnit)}
            unit={secondUnit?.unitType || "sprint"}
          />
        )}
        {thirdUnit && (
          <CountDown
            ratio={getCurrentRatio(thirdUnit)}
            unit={thirdUnit?.unitType || "quarter"}
          />
        )}
      </div>
    </div>
  );
};
