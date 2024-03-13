import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import { DATE_TIME_NO_SECONDS } from "../../commonUtils";
import { ListTypes } from "../itemList/types";

const generateList = (Now: DateTime) => ({
  title: "Day",
  endDate: Now.endOf("day").toFormat(DATE_TIME_NO_SECONDS),
  startDate: Now.startOf("day").toFormat(DATE_TIME_NO_SECONDS),
  type: "date" as const,
  list: [],
});

export const generateNewList = (params?: GenerateNewListProps) => ({
  listKey: params?.listKey ?? `list-${uuidv4()}`,
  listObject: params?.listObject ?? generateList(DateTime.now()),
});

interface GenerateNewListProps {
  listKey?: string;
  listObject?: ListTypes;
}
