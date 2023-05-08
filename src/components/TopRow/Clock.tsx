import { DateTime } from "luxon";
import { useAppSelector } from "../../app/hooks";
import { selectTimeFormat } from "../../features/Settings/settingsSlice";

export const Clock = ({ date }: { date: string }) => {
  const timeFormat = useAppSelector(selectTimeFormat);

  return (
    <span className="clock">
      {timeFormat && DateTime.fromISO(date).toFormat(timeFormat)}
    </span>
  );
};
