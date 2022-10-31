import { CountDown } from "./CountDown";
import { DateTime, DurationObjectUnits } from "luxon";
import { useSelector } from "react-redux";
import {
  selectAllUnits,
  UnitsState,
} from "../../features/general/settingsSlice";
import { useEffect, useState } from "react";

interface CalculatedTimes {
  start: number;
  end: number;
}
type CalculatedTimesObj = Record<keyof UnitsState, CalculatedTimes>;
type Predicate = (date: DateTime) => boolean;

const getCurrentRatio = (
  { start, end }: CalculatedTimes,
  setNeedsAdjustment: (value: React.SetStateAction<boolean>) => void
) => {
  const timeElapsed = DateTime.now().toMillis() - start;
  const totalTime = end - start;
  const ratio = timeElapsed / totalTime;
  if (ratio > 1 && ratio !== Infinity) {
    setNeedsAdjustment(true);
  }
  if (totalTime) {
    return Math.floor(ratio * 100);
  }
  return NaN;
};

const dateIsPast = (date: DateTime) => date.diffNow().toMillis() < 0;

const durationFormatter = (duration?: string) => {
  if (typeof duration === "string") {
    const [qty, unit] = duration.split(" ", 2);
    return { [unit]: parseInt(qty) } as DurationObjectUnits;
  }
};

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

const predicateDateRecalc = (
  date: DateTime,
  interval: DurationObjectUnits,
  predicate: Predicate
) => {
  let newDate = date;
  let lastDate;
  while (predicate(newDate)) {
    lastDate = newDate;
    newDate = newDate.plus(interval);
  }
  return { newDate, lastDate };
};
