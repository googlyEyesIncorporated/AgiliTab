import { CountDown } from "./CountDown";
import { DateTime } from "luxon";
import { useSelector } from "react-redux";
import {
  selectAllUnits,
  selectWorkDayToggle,
  selectWorkingHours,
} from "../../features/general/settingsSlice";
import { useEffect, useState } from "react";
import { UnitsState } from "../../features/general/types";
import {
  durationFormatter,
  getCurrentRatio,
  predicateDateRecalc,
  CalculatedTimes,
} from "./utils";

type CalculatedTimesObj = Record<keyof UnitsState, CalculatedTimes>;
const dateIsPast = (date: DateTime) => date.diffNow().toMillis() < 0;

export const TimeLeft = () => {
  const timeUnits = useSelector(selectAllUnits);
  const [adjustedTimeFrames, setAdjustedTimeFrames] = useState({
    shortTerm: { start: 0, end: 0 },
    mediumTerm: { start: 0, end: 0 },
    longTerm: { start: 0, end: 0 },
  });
  const [currentDay, setCurrentDay] = useState(0);
  const scopedToWorkingHours = useSelector(selectWorkDayToggle);
  const [workDayToggle, setWorkDayToggle] = useState(scopedToWorkingHours);
  const workingHours = useSelector(selectWorkingHours);
  const [workDayHours, setWorkDayHours] = useState(workingHours);
  const [needsAdjustment, setNeedsAdjustment] = useState(false);

  useEffect(() => {
    if (needsAdjustment) {
      const newUnits: CalculatedTimesObj = {
        shortTerm: {},
        mediumTerm: {},
        longTerm: {},
      } as CalculatedTimesObj;
      for (const property in timeUnits) {
        const list = timeUnits[property as keyof UnitsState];
        let endDate, startDate;
        if ("workingHours" in list && workDayToggle) {
          startDate = DateTime.fromFormat(workDayHours.times.start, "T");
          endDate = DateTime.fromFormat(workDayHours.times.end, "T");
        } else if ("duration" in list) {
          const referencePoint = DateTime.fromISO(list.startDate);
          const duration = durationFormatter(list.duration);
          const recalcedDate = predicateDateRecalc(
            referencePoint,
            duration || {},
            dateIsPast
          );
          endDate = recalcedDate.newDate;
          startDate = recalcedDate.lastDate;
        }

        if (startDate && endDate) {
          newUnits[property as keyof UnitsState].start = startDate.toMillis();
          newUnits[property as keyof UnitsState].end = endDate.toMillis();
        }
      }
      setAdjustedTimeFrames({ ...newUnits });
      setNeedsAdjustment(false);
    }
  }, [timeUnits, needsAdjustment, workDayToggle, workDayHours]);

  const today = DateTime.now().day;
  // TODO: There has got to be a better way to do this
  if (currentDay !== today) {
    setCurrentDay(today);
    setNeedsAdjustment(true);
  } else if (workDayToggle !== scopedToWorkingHours) {
    setWorkDayToggle(scopedToWorkingHours);
    setNeedsAdjustment(true);
  } else if (workDayHours !== workingHours) {
    setWorkDayHours(workingHours);
    setNeedsAdjustment(true);
  }

  const { shortTerm, mediumTerm, longTerm } = adjustedTimeFrames;
  return (
    <div className="time-left" id="countdownbox">
      <div className="countdown-title">Time Elapsed:</div>
      <div className="countdowns" id="countdownbox-justifier">
        <CountDown ratio={getCurrentRatio(shortTerm)} unit={"day"} />
        {mediumTerm && (
          <CountDown
            ratio={getCurrentRatio(mediumTerm)}
            unit={timeUnits.mediumTerm?.unitType || "sprint"}
          />
        )}
        {longTerm && (
          <CountDown
            ratio={getCurrentRatio(longTerm)}
            unit={timeUnits.longTerm?.unitType || "quarter"}
          />
        )}
      </div>
    </div>
  );
};
