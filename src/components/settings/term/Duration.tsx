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
  groupId: number;
  enabled?: boolean;
  setDuration: React.Dispatch<React.SetStateAction<DurationState>>;
  duration: DurationState;
  onChange: (change: any) => void;
}

const getBackgroundColor = (enabled: boolean) => ({
  backgroundColor: enabled ? "white" : "darkgray",
});

export const Duration = ({
  groupId,
  enabled = true,
  setDuration,
  duration,
  onChange,
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

  const categoryUnitQty = `group-${groupId}-unit-qty`;
  const categoryDurationFormatInput = `group-${groupId}-duration-format-input`;

  return (
    <div className="inline-block w-1/2">
      <label htmlFor={categoryUnitQty}>Duration: </label>
      <input
        type="number"
        name={categoryUnitQty}
        id={categoryUnitQty}
        data-testid={categoryUnitQty}
        min="1"
        max="100"
        className="pt-2 pl-1 h-6 w-12 leading-loose"
        style={{
          ...getBackgroundColor(enabled),
        }}
        {...(enabled ? {} : { disabled: true })}
        value={qty}
        onChange={(e) => {
          const newQty = parseInt(e.target.value);
          setQty(newQty);
          const durationObj = { unit, qty: newQty };
          if (unit) {
            setDuration(durationObj);
            onChange({ duration: durationObj });
          }
        }}
      />
      <select
        className="pt-2 pb-1 align-top h-6"
        name={categoryDurationFormatInput}
        id={categoryDurationFormatInput}
        data-testid={categoryDurationFormatInput}
        value={`${unit}`}
        style={getBackgroundColor(enabled)}
        {...(enabled ? {} : { disabled: true })}
        onChange={(e) => {
          const newUnit = e.target.value;
          setUnit(newUnit);
          const durationObj = { unit: newUnit, qty };

          if (qty) {
            setDuration(durationObj);
            onChange(durationObj);
          }
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
