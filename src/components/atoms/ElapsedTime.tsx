import { DurationObj } from "../../features/itemList/types";
import { getCurrentRatio } from "../bottomRow/utils";
import { Duration, EndDate } from "../bottomRow/utils/getCurrentRatio";

interface IElapsedTime {
  className?: string;
  groupId: string;
  term: EndDate | Duration<DurationObj>;
}

export const ElapsedTime = ({ className, groupId, term }: IElapsedTime) => {
  const shouldCapToRange = false;
  return (
    <span
      className={`right-0 absolute ${className}`}
      data-testid={`group-${groupId}-elapsed-time`}
    >
      {getCurrentRatio(term, shouldCapToRange) + "%"}
    </span>
  );
};
