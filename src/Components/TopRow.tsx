import { TimeLeft } from "./timeLeftBox/TimeLeft";
import { NowBox, ClockProps } from "./NowBox";

export const TopRow = (props: ClockProps) => {
  return (
    <div id="top-row">
      <NowBox {...props} />
      <TimeLeft />
    </div>
  );
};
