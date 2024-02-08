import { DateTime } from "luxon";
import { UnitType } from "../../../features/settings/types";

/**
 * Calculates Start/end MS based on either duration or end date
 * @param {UnitType} termData data describing the term
 * @returns object \{ start, end }
 */
export const calculateStartEndMs = <T extends boolean>(
  termData: UnitType<T>
) => {
  const start = DateTime.fromISO(termData.startDate).toMillis();
  let end;
  if (termData.isDuration && termData.duration) {
    const duration = { [termData.duration.unit]: termData.duration.qty };
    end = DateTime.fromISO(termData.startDate).plus(duration).toMillis();
  } else {
    end = DateTime.fromISO(termData.endDate ?? "").toMillis();
  }
  return { end, start };
};
