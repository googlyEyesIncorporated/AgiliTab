import { CountDown } from "./CountDown";
import { DateTime, DayNumbers } from "luxon";
import { useSelector } from "react-redux";
import {
  selectAllUnits,
  selectWorkDayToggle,
  selectWorkingHours,
} from "../../features/general/settingsSlice";
import { useEffect, useState } from "react";
import { ScopedToWorkingHours, UnitType } from "../../features/general/types";
import {
  durationFormatter,
  getCurrentRatio,
  predicateDateRecalc,
} from "./utils";

const dateIsPast = (date: DateTime) => date.diffNow().toMillis() < 0;

const calculateStartEndMs = (
  savedShortTerm: (UnitType & ScopedToWorkingHours) | UnitType
) => {
  const referencePoint = DateTime.fromISO(savedShortTerm.startDate);
  const duration = durationFormatter(savedShortTerm.duration);
  const recalcedDate = predicateDateRecalc(
    referencePoint,
    duration || {},
    dateIsPast
  );
  const end = recalcedDate.newDate.toMillis();
  const start = recalcedDate.lastDate?.toMillis() || referencePoint.toMillis();
  return { end, start };
};

// Shows time left based on settings and ...time left
export const TimeLeft = ({ today }: { today: DayNumbers }) => {
  const scopedToWorkingHours = useSelector(selectWorkDayToggle);
  const savedWorkingHours = useSelector(selectWorkingHours);

  // Get startTime and duration data for each term
  const [shortTerm, setShortTerm] = useState({ start: 0, end: 0 });
  const [mediumTerm, setMediumTerm] = useState({ start: 0, end: 0 });
  const [longTerm, setLongTerm] = useState({ start: 0, end: 0 });
  const savedTimeUnits = useSelector(selectAllUnits);
  const {
    shortTerm: savedShortTerm,
    mediumTerm: savedMediumTerm,
    longTerm: savedLongTerm,
  } = savedTimeUnits;

  const savedWorkingStart = DateTime.fromFormat(
    savedWorkingHours.times.start,
    "T"
  ).toMillis();
  const savedWorkingEnd = DateTime.fromFormat(
    savedWorkingHours.times.end,
    "T"
  ).toMillis();

  // Calculate end date and new start times (if needed)
  useEffect(() => {
    if (scopedToWorkingHours) {
      // Supplant shortTerm start and end times if workday is selected
      setShortTerm({ start: savedWorkingStart, end: savedWorkingEnd });
    } else {
      setShortTerm(calculateStartEndMs(savedShortTerm));
    }
  }, [
    savedShortTerm,
    scopedToWorkingHours,
    savedWorkingStart,
    savedWorkingEnd,
    today,
  ]);

  useEffect(() => {
    setMediumTerm(calculateStartEndMs(savedMediumTerm));
  }, [savedMediumTerm, today]);

  useEffect(() => {
    setLongTerm(calculateStartEndMs(savedLongTerm));
  }, [savedLongTerm, today]);

  // submit start/end times for ratio calc
  return (
    <div className="time-left" id="countdownbox">
      <div className="countdown-title">Time Elapsed:</div>
      <div className="countdowns" id="countdownbox-justifier">
        <CountDown ratio={getCurrentRatio(shortTerm)} unit={"day"} />
        {mediumTerm && (
          <CountDown
            ratio={getCurrentRatio(mediumTerm)}
            unit={savedTimeUnits.mediumTerm?.unitType || "sprint"}
          />
        )}
        {longTerm && (
          <CountDown
            ratio={getCurrentRatio(longTerm)}
            unit={savedTimeUnits.longTerm?.unitType || "quarter"}
          />
        )}
      </div>
    </div>
  );
};
