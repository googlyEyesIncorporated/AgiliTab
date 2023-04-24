import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectDateFormat,
  selectTimeFormat,
  updateDay,
} from "../../../features/Settings/settingsSlice";
import { Clock } from "./Clock";

export const NowBox = () => {
  const [date, setDate] = useState(DateTime.now().toISO());
  const dispatch = useAppDispatch();
  const dateFormat = useAppSelector(selectDateFormat);
  const timeFormat = useAppSelector(selectTimeFormat);
  const withSeconds = Boolean(timeFormat.split(":")[2]);
  useEffect(() => {
    const delay = withSeconds ? 1000 : 5000;
    const updateDate = () => {
      setDate(DateTime.now().toISO());
    };

    updateDate();

    const interval = setInterval(() => {
      updateDate();
    }, delay);

    return () => clearInterval(interval);
  }, [withSeconds]);

  const startOfDay = DateTime.fromISO(date).startOf("day").toISO();

  // Update day start/end times
  useEffect(() => {
    dispatch(updateDay(startOfDay));
  }, [startOfDay, dispatch]);

  return (
    <div id="top-row">
      <div
        className="now"
        id="nowbox"
        style={{
          fontSize: "3em",
          width: "50%",
          border: "1px solid",
          padding: "0.5rem",
        }}
      >
        <Clock date={date} />
        <span className="date" style={{ marginTop: "1rem" }}>
          <span
            style={{
              fontSize: "1.5rem",
            }}
          >
            <div>
              {DateTime.fromISO(date).weekdayLong +
                " - " +
                (dateFormat && DateTime.fromISO(date).toFormat(dateFormat))}
            </div>
          </span>
        </span>
      </div>
    </div>
  );
};