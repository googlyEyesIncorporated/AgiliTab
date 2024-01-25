import { DateTime } from "luxon";
import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectDateFormat,
  updateDay,
} from "../../features/settings/settingsSlice";
import { Clock } from "./Clock";
import { DateContext } from "../TimeProvider";
import { DATE_TIME_NO_SECONDS } from "../../commonUtils";

export const NowBox = () => {
  const dispatch = useAppDispatch();
  const dateFormat = useAppSelector(selectDateFormat);
  const date = useContext(DateContext);

  const startOfDay = DateTime.fromISO(date)
    .startOf("day")
    .toFormat(DATE_TIME_NO_SECONDS);

  // Update day start/end times
  useEffect(() => {
    dispatch(updateDay(startOfDay));
  }, [startOfDay, dispatch]);

  return (
    <div className="fade-in-down-1s flex flex-wrap lg:flex-nowrap mt-4 lg:mt-12 mb-8 justify-between">
      <div className="now leading-none text-[3.375rem] border border-current border-solid my-2 mx-auto p-2 w-full lg:max-w-1/2 lg:w-3/10 text-center">
        <Clock date={date} />
        <span className="date">
          <span className="text-2xl">
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
