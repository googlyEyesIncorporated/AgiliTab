import { TimeLeft } from "./timeLeftBox/TimeLeft";
import { NowBox } from "./NowBox";

export const TopRow = () => {
  return (
    <div id="top-row">
      <NowBox />
      <TimeLeft />
    </div>
  );
};
