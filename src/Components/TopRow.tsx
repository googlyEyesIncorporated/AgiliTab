import { TimeLeft } from "./timeLeftBox/TimeLeft";
import { NowBox } from "./NowBox";
import { DateTime } from "luxon";

export const TopRow = () => {
  // recalc new end date and new start times at 12am
  const today = DateTime.now().day;

  return (
    <div id="top-row">
      <NowBox />
      <TimeLeft today={today} />
    </div>
  );
};
