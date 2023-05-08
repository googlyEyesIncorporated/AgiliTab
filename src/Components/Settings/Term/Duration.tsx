import { useEffect, useState } from "react";
import { DurationState } from "../../../features/Settings/types";

const formats = {
  units: {
    DAY: "day",
    WEEK: "week",
    MONTH: "month",
    YEAR: "year",
  },
};
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
