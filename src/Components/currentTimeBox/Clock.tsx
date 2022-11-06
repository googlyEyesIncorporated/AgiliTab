import { DateTime } from "luxon";
import { useAppSelector } from "../../app/hooks";
import { selectTimeFormat } from "../../features/general/settingsSlice";
import "./Clock.css";

export const Clock = ({ date }: { date: DateTime }) => {
  const timeFormat = useAppSelector(selectTimeFormat);

  return <div className="clock">{timeFormat && date.toFormat(timeFormat)}</div>;
};
