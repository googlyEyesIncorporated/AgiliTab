import { DateTime } from "luxon";
import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectDateFormat,
  updateDay,
} from "../../features/settings/settingsSlice";
import { Clock } from "./Clock";
import { DateContext } from "../TimeHandler";

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
    <div className="fade-in-down-1s flex flex-wrap lg:flex-nowrap mt-4 lg:mt-12 mb-8 justify-between">
      <div
        className="now text-5xl leading-relaxed border border-current border-solid my-2 mx-auto p-2 w-full lg:max-w-1/2 lg:w-3/10 text-center"
        id="itisnow"
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
