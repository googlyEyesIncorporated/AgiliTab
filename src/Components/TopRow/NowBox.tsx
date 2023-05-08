import { DateTime } from "luxon";
import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectDateFormat,
  updateDay,
} from "../../features/Settings/settingsSlice";
import { Clock } from "./Clock";
import { DateContext } from "../../TimeHandler";

export const NowBox = () => {
  const dispatch = useAppDispatch();
  const dateFormat = useAppSelector(selectDateFormat);
  const date = useContext(DateContext);

  const startOfDay = DateTime.fromISO(date).startOf("day").toISO();

  // Update day start/end times
  useEffect(() => {
    dispatch(updateDay(startOfDay));
  }, [startOfDay, dispatch]);

  return (
    <div id="top-row">
      <div className="now" id="nowbox">
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
