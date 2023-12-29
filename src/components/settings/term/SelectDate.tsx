import { DateTime } from "luxon";

type Limit = Partial<Record<"min" | "max", string>>;
interface CommonProps {
  date: string;
  title: "Beginning" | "End";
  limit: Limit;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  enabled: boolean;
}

interface SelectDateProps extends CommonProps {
  groupId: number;
}
interface HandleDateSelection extends CommonProps {
  value: string;
}

const handleDateSelection = ({
  value,
  enabled,
  title,
  date,
  setStartDate,
  setEndDate,
  limit,
}: HandleDateSelection) => {
  if (enabled) {
    if (title === "Beginning") {
      if (limit.max) {
        const duration = DateTime.fromISO(limit.max).diff(
          DateTime.fromISO(date)
        );
        setStartDate(DateTime.fromISO(value).toISO() ?? "");
        setEndDate(DateTime.fromISO(value).plus(duration).toISO() ?? "");
      }
    } else {
      setEndDate(DateTime.fromISO(value).toISO() ?? "");
    }
  }
};

export const SelectDate = ({
  date,
  title,
  groupId,
  limit,
  setStartDate,
  setEndDate,
  enabled = true,
}: SelectDateProps) => {
  const formattedLimit: Limit = {};
  if ("min" in limit && limit.min) {
    formattedLimit.min = DateTime.fromISO(limit.min).toISODate() ?? undefined;
  }
  const categoryDatePicker = `group-${groupId}-${title.toLowerCase()}-datepicker`;
  return (
    <div className="inline-block w-1/2">
      <label htmlFor={categoryDatePicker}> {title}: </label>
      <input
        type="date"
        {...formattedLimit}
        id={categoryDatePicker}
        data-testid={categoryDatePicker}
        name={categoryDatePicker}
        value={DateTime.fromISO(date).toISODate() ?? ""}
        style={{ backgroundColor: enabled ? "white" : "darkgray" }}
        disabled={!enabled}
        className="pt-2 pl-1 h-6 mb-0.5"
        onChange={(e) => {
          handleDateSelection({
            value: e.target.value,
            enabled,
            title,
            date,
            setStartDate,
            setEndDate,
            limit,
          });
        }}
      />
    </div>
  );
};
