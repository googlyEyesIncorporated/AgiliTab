import {
  endOfToday,
  startOfToday,
} from "../../../features/settings/settingsSlice";

export const getRelativeDay = (
  isScopedToWorkingHours: boolean,
  workDayEnd: number,
  workDayStart: number
) => {
  if (isScopedToWorkingHours) {
    return {
      start: workDayStart,
      end: workDayEnd,
      unitType: "work day",
    };
  } else {
    return {
      start: startOfToday.toMillis(),
      end: endOfToday.toMillis(),
      unitType: "day",
    };
  }
};
