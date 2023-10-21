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
  category: string;
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
        setStartDate(DateTime.fromISO(value).toISO() ?? '');
        setEndDate(DateTime.fromISO(value).plus(duration).toISO() ?? '');
      }
    } else {
      setEndDate(DateTime.fromISO(value).toISO() ?? '');
    }
  }
};

export const SelectDate = ({
  date,
  title,
  category,
  limit,
  setStartDate,
  setEndDate,
  enabled = true,
}: SelectDateProps) => {
  const formattedLimit: Limit = {};
  if ("min" in limit && limit.min) {
    formattedLimit.min = DateTime.fromISO(limit.min).toISODate() ?? undefined;
  }
  return (
    <div style={{ display: "inline-block", width: "50%" }}>
      <label htmlFor={`${category}-${title}-datepicker`}> {title}: </label>
      <input
        type="date"
        {...formattedLimit}
        id={`${category}-${title}-datepicker`}
        name={`${category}-${title}-datepicker`}
        value={DateTime.fromISO(date).toISODate() ?? ''}
        style={{ backgroundColor: enabled ? "white" : "darkgray" }}
        disabled={!enabled}
        className="pt-5 pl-3 input-height"
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
