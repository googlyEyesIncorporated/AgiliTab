import { DateTime } from "luxon";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectDateFormat,
  updateDay,
} from "../features/Settings/settingsSlice";
import { Clock } from "./currentTimeBox/Clock";

export interface ClockProps {
  h24: boolean;
}
let dateFormat;
let currentDay = DateTime.now().toISO(); // Should be shared between all windows
export const NowBox = () => {
  const dispatch = useAppDispatch();
  dateFormat = useAppSelector(selectDateFormat);
  useEffect(() => {
    const updateDate = () => {
      currentDay = DateTime.now().toISO();
    };

    updateDate();

    const interval = setInterval(() => {
      updateDate();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const startOfDay = DateTime.fromISO(currentDay).startOf("day").toISO();

  // Update day start/end times
  useEffect(() => {
    dispatch(updateDay());
  }, [startOfDay, dispatch]);

  return (
    <div className="now" id="nowbox">
      <Clock date={currentDay} />
      <div className="date" style={{ marginTop: "1rem" }}>
        <div>{DateTime.fromISO(currentDay).weekdayLong}</div>
        <div>
          {dateFormat && DateTime.fromISO(currentDay).toFormat(dateFormat)}
        </div>
      </div>
    </div>
  );
};
