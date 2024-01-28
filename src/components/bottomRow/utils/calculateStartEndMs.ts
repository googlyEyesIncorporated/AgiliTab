import { DateTime } from "luxon";
import { UnitType } from "../../../features/settings/types";

/**
 *
 * @param termData
 * @returns
 */
export const calculateStartEndMs = (termData: UnitType | UnitType) => {
  const referencePoint = DateTime.fromISO(termData.startDate);
  const commonObj = { unitType: termData.unitType };
  // If based on duration and not an end date
  if (termData.duration && termData.isDuration) {
    const duration = { [termData.duration.unit]: termData.duration.qty };
    const end = DateTime.fromISO(termData.startDate).plus(duration).toMillis();
    return {
      ...commonObj,
      end,
      start: referencePoint.toMillis(),
    };
  }
  // If not repeat
  const end = DateTime.fromISO(termData.endDate ?? "").toMillis();
  return { ...commonObj, end, start: referencePoint.toMillis() };
};
