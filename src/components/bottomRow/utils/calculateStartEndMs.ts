import { DateTime } from "luxon";
import { UnitType, UnitTypes } from "../../../features/itemList/types";

/**
 * Calculates Start/end MS based on either duration or end date
 * @param {UnitType} termData data describing the term
 * @returns object \{ start, end }
 */
export const calculateStartEndMs = <T extends UnitTypes>(
  termData: UnitType<T>
) => {
  if (termData.type === "none") {
    return null;
  }
  const start = DateTime.fromISO(termData.startDate).toMillis();
  let end;
  if (termData.type === "duration" && termData.duration) {
    const duration = { [termData.duration.unit]: termData.duration.qty };
    end = DateTime.fromISO(termData.startDate).plus(duration).toMillis();
  } else {
    end = DateTime.fromISO(termData.endDate ?? "").toMillis();
  }
  return { end, start };
};
