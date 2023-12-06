import { useEffect, useState } from "react";
import { DurationState } from "../../../features/settings/types";

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
  backgroundColor: enabled ? "white" : "darkgray",
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

  const categoryUnitQty = `${category}-unit-qty`;
  const categoryDurationFormatInput = `${category}-duration-format-input`;

  return (
    <div style={{ display: "inline-block", width: "50%" }}>
      <label htmlFor={categoryUnitQty}>Duration: </label>
      <input
        type="number"
        name={categoryUnitQty}
        id={categoryUnitQty}
        min="1"
        max="100"
        className="pt-2 pl-1 h-6"
        style={{
          width: "3rem",
          ...BackgroundAndHeightStyle(enabled),
          lineHeight: 2,
        }}
        {...(enabled ? {} : { disabled: true })}
        value={qty}
        onChange={(e) => {
          const newQty = parseInt(e.target.value);
          setQty(newQty);
          if (unit) setDuration({ unit, qty: newQty });
        }}
      />
      <select
        className="pt-2 pb-1 align-top h-6"
        name={categoryDurationFormatInput}
        id={categoryDurationFormatInput}
        value={`${unit}`}
        style={BackgroundAndHeightStyle(enabled)}
        {...(enabled ? {} : { disabled: true })}
        onChange={(e) => {
          const newUnit = e.target.value;
          setUnit(newUnit);
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
