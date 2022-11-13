import { DateTime } from "luxon";
import { useAppSelector } from "../../app/hooks";
import { selectTimeFormat } from "../../features/Settings/settingsSlice";
import "./Clock.css";

export const Clock = ({ date }: { date: string }) => {
  const timeFormat = useAppSelector(selectTimeFormat);

  return (
    <div className="clock">
      {timeFormat && DateTime.fromISO(date).toFormat(timeFormat)}
    </div>
  );
};
