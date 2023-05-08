import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectTimeFormat } from "../features/Settings/settingsSlice";
import { DateTime } from "luxon";
import { createContext } from "react";

interface ITimeHandler {
  specifiedTime?: number;
  children: React.ReactNode;
}
export const DateContext = createContext("");

const oneSecond = 1000;

function TimeHandler({ specifiedTime = 5000, children }: ITimeHandler) {
  const [date, setDate] = useState(DateTime.now().toISO());
  const timeFormat = useAppSelector(selectTimeFormat);
  const shouldUpdateEverySecond = Boolean(timeFormat.split(":")[2]);
  const delay = shouldUpdateEverySecond ? oneSecond : specifiedTime;
  useEffect(() => {
    const updateDate = () => {
      setDate(DateTime.now().toISO());
    };

    updateDate();

    const interval = setInterval(() => {
      updateDate();
    }, delay);

    return () => clearInterval(interval);
  }, [delay]);

  return <DateContext.Provider value={date}>{children}</DateContext.Provider>;
}

export default TimeHandler;
