import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectDateFormat } from "../features/general/settingsSlice";
import { Clock } from "./currentTimeBox/Clock";

export interface ClockProps {
  h24: boolean;
}

export const NowBox = () => {
  const [date, setDate] = useState(DateTime.now());
  const dateFormat = useAppSelector(selectDateFormat);

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
    <div className="now" id="nowbox">
      <Clock date={date} />
      <div className="date" style={{ marginTop: "1rem" }}>
        <div>{date.weekdayLong}</div>
        <div>{dateFormat && date.toFormat(dateFormat)}</div>
      </div>
    </div>
  );
};
