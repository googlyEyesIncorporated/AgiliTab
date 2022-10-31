import { CountDown } from "./CountDown";
import { DateTime } from "luxon";
import { useSelector } from "react-redux";
import { selectAllUnits } from "../../features/general/settingsSlice";
import { useEffect, useState } from "react";
import { UnitsState } from "../../features/general/types";
import {
  dateIsPast,
  durationFormatter,
  getCurrentRatio,
  predicateDateRecalc,
  CalculatedTimes,
} from "./utils";

type CalculatedTimesObj = Record<keyof UnitsState, CalculatedTimes>;

export const TimeLeft = () => {
  const timeUnits = useSelector(selectAllUnits);

  const [adjustedTimeFrames, setAdjustedTimeFrames] = useState({
    shortTerm: { start: 0, end: 0 },
    mediumTerm: { start: 0, end: 0 },
    longTerm: { start: 0, end: 0 },
  });
  const [needsAdjustment, setNeedsAdjustment] = useState(true);

  useEffect(() => {
    if (needsAdjustment) {
      const newUnits: CalculatedTimesObj = {
        shortTerm: {},
        mediumTerm: {},
        longTerm: {},
      } as CalculatedTimesObj;
      for (const property in timeUnits) {
        const list = timeUnits[property as keyof UnitsState];
        const referencePoint = DateTime.fromISO(list.startDate);
        let duration;
        if ("duration" in list) {
          duration = durationFormatter(list.duration);
        }

        if ("endDate" in list) {
          const endPoint = DateTime.fromISO(list.endDate);
          duration = endPoint.diff(referencePoint);
        }
        const { newDate: endDate, lastDate: startDate } = predicateDateRecalc(
          referencePoint,
          duration || {},
          dateIsPast
        );
        if (startDate && endDate) {
          newUnits[property as keyof UnitsState].start = startDate.toMillis();
          newUnits[property as keyof UnitsState].end = endDate.toMillis();
        }
      }
      setAdjustedTimeFrames({ ...newUnits });
      setNeedsAdjustment(false);
    }
  }, [timeUnits, needsAdjustment]);

  const { shortTerm, mediumTerm, longTerm } = adjustedTimeFrames;
  return (
    <div className="time-left" id="countdownbox">
      <div className="countdown-title">Time Elapsed:</div>
      <div className="countdowns" id="countdownbox-justifier">
        <CountDown
          ratio={getCurrentRatio(shortTerm, setNeedsAdjustment)}
          unit={"day"}
        />
        {mediumTerm && (
          <CountDown
            ratio={getCurrentRatio(mediumTerm, setNeedsAdjustment)}
            unit={timeUnits.mediumTerm?.unitType || "sprint"}
          />
        )}
        {longTerm && (
          <CountDown
            ratio={getCurrentRatio(longTerm, setNeedsAdjustment)}
            unit={timeUnits.longTerm?.unitType || "quarter"}
          />
        )}
      </div>
    </div>
  );
};
