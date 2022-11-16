import { DateTime } from "luxon";
import { useAppSelector } from "../../../app/hooks";
import { selectTimeFormat } from "../../../features/Settings/settingsSlice";

export const Clock = ({ date }: { date: string }) => {
  const timeFormat = useAppSelector(selectTimeFormat);

  return (
    <div
      className="clock"
      style={{
        fontSize: "3em",
        width: "100%",
        border: "1px solid",
        padding: "0.5rem",
      }}
    >
      {timeFormat && DateTime.fromISO(date).toFormat(timeFormat)}
    </div>
  );
};
