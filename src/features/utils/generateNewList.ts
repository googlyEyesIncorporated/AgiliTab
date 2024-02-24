import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import { DATE_TIME_NO_SECONDS } from "../../commonUtils";

export const generateNewList = () => {
  const Now = DateTime.now();

  return {
    listKey: `list-${uuidv4()}`,
    listObject: {
      title: "Day",
      endDate: Now.endOf("day").toFormat(DATE_TIME_NO_SECONDS),
      startDate: Now.startOf("day").toFormat(DATE_TIME_NO_SECONDS),
      type: "date" as const,
      list: [
        {
          done: false,
          id: "60b54fef-073c-4ed4-8698-3c4cc8f39b05",
          name: "do a thing",
        },
      ],
    },
  };
};
