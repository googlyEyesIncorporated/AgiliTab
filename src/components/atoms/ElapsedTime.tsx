import { StartAndEnd } from "../../app/commonTypes";
import { getCurrentRatio } from "../bottomRow/utils";

interface IElapsedTime {
  className?: string;
  groupId: number;
  term: StartAndEnd;
}

export const ElapsedTime = ({ term, className, groupId }: IElapsedTime) => {
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
