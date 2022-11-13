import { useEffect, useState } from "react";
import { DurationState } from "../../features/Settings/types";
import { formats } from "../timeLeftBox/dateData";

interface DurationProps {
  category: string;
  enabled?: boolean;
  setDuration: React.Dispatch<React.SetStateAction<DurationState>>;
  duration: DurationState;
}

const BackgroundAndHeightStyle = (enabled: boolean) => ({
  height: "1.1875rem",
  backgroundColor: enabled ? "ButtonFace" : "darkgray",
});

export const Duration = ({
  category,
  enabled = true,
  setDuration,
  duration,
}: DurationProps) => {
  const { qty: dQty, unit: dUnit } = duration;
  const [qty, setQty] = useState(dQty);
  const [unit, setUnit] = useState(dUnit);

  useEffect(() => {
    if (dQty) setQty(dQty);
  }, [dQty]);

  useEffect(() => {
    if (dUnit) setUnit(dUnit);
  }, [dUnit]);

  return (
    <div style={{ display: "inline-block", width: "50%" }}>
      <label htmlFor={`${category}-unit-qty`}>Duration: </label>
      <input
        type="number"
        name={`${category}-unit-qty`}
        id={`${category}-unit-qty`}
        min="1"
        max="100"
        style={{
          width: "3rem",
          ...BackgroundAndHeightStyle(enabled),
        }}
        value={qty}
        onChange={(e) => {
          const newQty = parseInt(e.target.value);
          if (enabled) setQty(newQty);
          if (unit) setDuration({ unit, qty: newQty });
        }}
      />
      <select
        name="date-format-input"
        id="date-format-input"
        value={`${unit}`}
        style={BackgroundAndHeightStyle(enabled)}
        onChange={(e) => {
          const newUnit = e.target.value;
          if (enabled) setUnit(newUnit);
          if (qty) setDuration({ unit: newUnit, qty });
        }}
      >
        <option value={formats.units.DAY + "s"}>{formats.units.DAY}s</option>
        <option value={formats.units.WEEK + "s"}>{formats.units.WEEK}s</option>
        <option value={formats.units.MONTH + "s"}>
          {formats.units.MONTH}s
        </option>
        <option value={formats.units.YEAR + "s"}>{formats.units.YEAR}s</option>
      </select>
    </div>
  );
};

// Committing and immediately removing, I dont want to lost this code in case i need it but have no need for it now
// useEffect(() => {
//   if (startDate && endDate) {
//     const dateEnd = DateTime.fromISO(endDate);
//     const dateStart = DateTime.fromISO(startDate);
//     const { calcUnit, calcQty } = estimateDuration(dateStart, dateEnd);
//     const roundedQty = Math.max(1, Math.round(calcQty || 0));
//     setQty(roundedQty);
//     setUnit(calcUnit);
//   }
// }, [startDate, endDate]);

// const estimateDuration = (dateStart: DateTime, dateEnd: DateTime) => {
//   let calcUnit;
//   let calcQty = Math.floor(
//     dateEnd.diff(dateStart, ["years"]).toObject().years || 0
//   );
//   if (calcQty) {
//     calcUnit = "years";
//   } else {
//     calcQty = Math.floor(
//       dateEnd.diff(dateStart, ["months"]).toObject().months || 0
//     );
//     if (calcQty) {
//       calcUnit = "months";
//     } else {
//       calcQty = Math.floor(
//         dateEnd.diff(dateStart, ["weeks"]).toObject().weeks || 0
//       );
//       if (calcQty) {
//         calcUnit = "weeks";
//       } else {
//         calcQty = Math.floor(
//           dateEnd.diff(dateStart, ["days"]).toObject().days || 0
//         );
//         calcUnit = "days";
//       }
//     }
//   }
//   return { calcUnit, calcQty };
// };
