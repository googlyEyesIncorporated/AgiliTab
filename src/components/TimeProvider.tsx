import {
  useEffect,
  useState,
  createContext,
  PropsWithChildren,
  useRef,
} from "react";
import { DateTime } from "luxon";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectTimeFormat,
  updateDay,
} from "../features/settings/settingsSlice";
import { callFunctionPeriodically } from "../utils/callFunctionPeriodically";
import { DATE_TIME_NO_SECONDS } from "../commonUtils";

interface ITimeProvider {
  specifiedPeriod?: number;
}
export const DateContext = createContext("");

const oneSecond = 1000;

function TimeProvider({
  specifiedPeriod = oneSecond,
  ...props
}: Readonly<PropsWithChildren<ITimeProvider>>) {
  const now = DateTime.now();
  const today = now.day;
  const [date, setDate] = useState(now.toISO() ?? "");
  const lastKnownDay = useRef(today);
  const timeFormat = useAppSelector(selectTimeFormat);
  const shouldUpdateEverySecond = Boolean(timeFormat.split(":")[2]);
  const delay = shouldUpdateEverySecond ? oneSecond : specifiedPeriod;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const updateDate = () => {
      setDate(DateTime.now().toISO() ?? "");
    };

    return callFunctionPeriodically(delay, updateDate);
  }, [delay]);

  // Update day start/end times
  useEffect(() => {
    if (lastKnownDay.current !== today) {
      lastKnownDay.current = today;
      const startOfDay = DateTime.fromISO(date).startOf("day").toISO();
      dispatch(updateDay(startOfDay));
    }
  }, [today, dispatch]);

  return <DateContext.Provider value={date} {...props} />;
}

export default TimeProvider;
