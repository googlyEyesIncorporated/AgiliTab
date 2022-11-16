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
    <div className="now" id="nowbox">
      <Clock date={date} />
      <div className="date" style={{ marginTop: "1rem" }}>
        <div>{DateTime.fromISO(date).weekdayLong}</div>
        <div>{dateFormat && DateTime.fromISO(date).toFormat(dateFormat)}</div>
      </div>
    </div>
  );
};
