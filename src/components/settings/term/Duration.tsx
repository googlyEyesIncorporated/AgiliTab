import { DurationObj } from "../../../features/itemList/types";

const formats = {
  units: {
    DAY: "day",
    WEEK: "week",
    MONTH: "month",
    YEAR: "year",
  },
};
interface DurationProps {
  groupId: string;
  enabled?: boolean;
  duration: DurationObj;
  onChange: (change: any) => void;
}

const getBackgroundColor = (enabled: boolean) => ({
  backgroundColor: enabled ? "white" : "darkgray",
});

export const Duration = ({
  groupId,
  enabled = true,
  duration,
  onChange,
}: DurationProps) => {
  const { qty, unit } = duration || { qty: 1, unit: undefined };

  const categoryUnitQty = `group-${groupId}-unit-qty`;
  const categoryDurationFormatInput = `group-${groupId}-duration-format-input`;

  return (
    <div className="inline-block h-[18px]">
      <label className="inline-block w-[61px]" htmlFor={categoryUnitQty}>
        Duration:
      </label>
      <input
        type="number"
        name={categoryUnitQty}
        id={categoryUnitQty}
        data-testid={categoryUnitQty}
        min="1"
        max="100"
        className="w-[2.5rem]"
        style={{
          ...getBackgroundColor(enabled),
        }}
        {...(enabled ? {} : { disabled: true })}
        value={qty}
        onChange={(e) => {
          const durationObj = { unit, qty: parseInt(e.target.value) };
          if (unit) {
            onChange({ duration: durationObj, endDate: undefined });
          }
        }}
      />
      <select
        className="h-full ml-1"
        name={categoryDurationFormatInput}
        id={categoryDurationFormatInput}
        data-testid={categoryDurationFormatInput}
        value={unit}
        style={getBackgroundColor(enabled)}
        {...(enabled ? {} : { disabled: true })}
        onChange={(e) => {
          const durationObj = { unit: e.target.value, qty };

          if (qty) {
            onChange({ duration: durationObj, endDate: undefined });
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
