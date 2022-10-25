import React from "react";
export const CountDown = ({ ratio, unit }: { ratio: number; unit: string }) => {
  return (
    <div className="countdown">
      <div className="countdown-segment">
        <div className="countdown-amount">{ratio}%</div>
        <div> ...of the {unit}</div>
      </div>
    </div>
  );
};
