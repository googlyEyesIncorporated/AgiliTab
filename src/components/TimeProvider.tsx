import { useEffect, useState, createContext, PropsWithChildren } from "react";
import { DateTime } from "luxon";

import { useAppSelector } from "../app/hooks";
import { selectTimeFormat } from "../features/settings/settingsSlice";
import { callFunctionPeriodically } from "../utils/callFunctionPeriodically";

interface ITimeProvider {
  specifiedPeriod?: number;
}
export const DateContext = createContext("");

const oneSecond = 1000;

function TimeProvider({
  specifiedPeriod = oneSecond,
  ...props
}: Readonly<PropsWithChildren<ITimeProvider>>) {
  const [date, setDate] = useState(DateTime.now().toISO() ?? "");
  const timeFormat = useAppSelector(selectTimeFormat);
  const shouldUpdateEverySecond = Boolean(timeFormat.split(":")[2]);
  const delay = shouldUpdateEverySecond ? oneSecond : specifiedPeriod;
  useEffect(() => {
    const updateDate = () => {
      setDate(DateTime.now().toISO() ?? "");
    };

    updateDate();
    return callFunctionPeriodically(delay, updateDate);
  }, [delay]);

  return <DateContext.Provider value={date} {...props} />;
}

export default TimeProvider;
