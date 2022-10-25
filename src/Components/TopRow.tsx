import { useEffect, useState } from "react";
import { Clock } from "./currentTimeBox/Clock";
import { TimeLeft } from "./timeLeftBox/TimeLeft";
import { TopRowProps, TimeLeftProps } from "../types";
import { weekDays } from "./timeLeftBox/dateData";
import { DateTime } from "luxon";

export const TopRow = ({ h24 = true }: TopRowProps) => {
  const [date, setDate] = useState(DateTime.now());

  useEffect(() => {
    const updateDate = () => {
      setDate(DateTime.now());
    };

    updateDate();

    const interval = setInterval(() => {
      updateDate();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="top-row">
      <div className="now" id="nowbox">
        <Clock date={date} h24={h24} />
        <div className="date" style={{ marginTop: "1rem" }}>
          <div>{weekDays[date.weekday]}</div>
          <div>{date.toFormat("MMM dd, yyyy")}</div>
        </div>
      </div>
      <TimeLeft />
    </div>
  );
};
