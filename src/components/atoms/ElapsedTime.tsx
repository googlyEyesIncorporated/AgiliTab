import React from "react";
import { StartEndUnitType } from "../../features/itemList/types";
import { getCurrentRatio } from "../bottomRow/utils";

interface IElapsedTime {
  className?: string;
  groupId: number;
  term: StartEndUnitType;
  isScopedToWorkingHours?: boolean;
}

export const ElapsedTime = ({
  term,
  className,
  groupId,
  isScopedToWorkingHours,
}: IElapsedTime) => {
  const shouldCapToRange = Boolean(isScopedToWorkingHours);
  return (
    <span
      className={`float-right ${className}`}
      data-testid={`group-${groupId}-elapsed-time`}
    >
      {getCurrentRatio(term, shouldCapToRange) + "%"}
    </span>
  );
};
