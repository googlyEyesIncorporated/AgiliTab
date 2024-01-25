import { useEffect, useState, createContext, PropsWithChildren } from "react";
import { useAppSelector } from "../app/hooks";
import { selectTimeFormat } from "../features/settings/settingsSlice";
import { DateTime } from "luxon";

interface ITimeHandler {
  specifiedPeriod?: number;
}
export const DateContext = createContext("");

const oneSecond = 1000;

function TimeHandler({
  specifiedPeriod = oneSecond,
  ...props
}: Readonly<PropsWithChildren<ITimeHandler>>) {
  const [date, setDate] = useState(DateTime.now().toISO() ?? "");
  const timeFormat = useAppSelector(selectTimeFormat);
  const shouldUpdateEverySecond = Boolean(timeFormat.split(":")[2]);
  const delay = shouldUpdateEverySecond ? oneSecond : specifiedPeriod;
  useEffect(() => {
    const updateDate = () => {
      setDate(DateTime.now().toISO() ?? "");
    };

    updateDate();

    const interval = setInterval(() => {
      updateDate();
    }, delay);

    return () => clearInterval(interval);
  }, [delay]);

  return <DateContext.Provider value={date} {...props} />;
}

export default TimeHandler;
