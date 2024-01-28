import { StartEndUnitType } from "../../features/itemList/types";
import { getCurrentRatio } from "../bottomRow/utils";

interface IElapsedTime {
  className?: string;
  groupId: number;
  term: StartEndUnitType;
}

export const ElapsedTime = ({ term, className, groupId }: IElapsedTime) => {
  const shouldCapToRange = false;
  return (
    <span
      className={`float-right ${className}`}
      data-testid={`group-${groupId}-elapsed-time`}
    >
      {getCurrentRatio(term, shouldCapToRange) + "%"}
    </span>
  );
};
