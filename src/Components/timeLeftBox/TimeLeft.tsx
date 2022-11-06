import { CountDown } from "./CountDown";
import { DateTime, DayNumbers } from "luxon";
import { useSelector } from "react-redux";
import {
  selectAllUnits,
  selectWorkDayToggle,
  selectWorkingHours,
} from "../../features/general/settingsSlice";
import { useEffect, useState } from "react";
import { calculateStartEndMs, getCurrentRatio } from "./utils";

// Shows time left based on settings and ...time left
export const TimeLeft = ({ today }: { today: DayNumbers }) => {
  const scopedToWorkingHours = useSelector(selectWorkDayToggle);
  const savedWorkingHours = useSelector(selectWorkingHours);

  // Get startTime and duration data for each term
  const [shortTerm, setShortTerm] = useState({
    start: 0,
    end: 0,
    unitType: "day",
  });
  const [mediumTerm, setMediumTerm] = useState({
    start: 0,
    end: 0,
    unitType: "month",
  });
  const [longTerm, setLongTerm] = useState({
    start: 0,
    end: 0,
    unitType: "year",
  });
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
      // Supplant shortTerm start and end times if workday is selected;
      setShortTerm({
        start: savedWorkingStart,
        end: savedWorkingEnd,
        unitType: "work day",
      });
    } else {
      setShortTerm(calculateStartEndMs({ ...savedShortTerm, unitType: "day" }));
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
        <CountDown
          ratio={getCurrentRatio(shortTerm)}
          unit={shortTerm.unitType}
        />
        {mediumTerm && (
          <CountDown
            ratio={getCurrentRatio(mediumTerm)}
            unit={mediumTerm?.unitType}
          />
        )}
        {longTerm && (
          <CountDown
            ratio={getCurrentRatio(longTerm)}
            unit={longTerm?.unitType}
          />
        )}
      </div>
    </div>
  );
};
