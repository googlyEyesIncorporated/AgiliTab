import { DateTime } from "luxon";
import { useContext } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectDateFormat } from "../../features/settings/settingsSlice";
import { Clock } from "./Clock";
import { DateContext } from "../TimeProvider";

export const NowBox = () => {
  const dateFormat = useAppSelector(selectDateFormat);
  const date = useContext(DateContext);

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
