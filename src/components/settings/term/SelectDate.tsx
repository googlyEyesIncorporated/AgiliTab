import { DateTime } from "luxon";

type Limit = Partial<Record<"min" | "max", string>>;
interface CommonProps {
  date: string;
  title: "Beginning" | "End";
  limit: Limit;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  onChange: (changed: any) => void;
}

interface SelectDateProps extends CommonProps {
  groupId: number;
}
interface HandleDateSelection extends CommonProps {
  value: string;
}

const handleDateSelection = ({
  value,
  title,
  date,
  setStartDate,
  setEndDate,
  limit,
  onChange,
}: HandleDateSelection) => {
  if (title === "Beginning") {
    if (limit.max) {
      const startDate = DateTime.fromISO(value).toISO() ?? "";
      const duration = DateTime.fromISO(limit.max).diff(DateTime.fromISO(date));
      const endDate = DateTime.fromISO(value).plus(duration).toISO() ?? "";
      setStartDate(startDate);
      setEndDate(endDate);
      onChange({ startDate, endDate });
    }
  } else {
    const endDate = DateTime.fromISO(value).toISO() ?? "";
    setEndDate(endDate);
    onChange({ endDate });
  }
};

export const SelectDate = ({
  date,
  title,
  groupId,
  limit,
  setStartDate,
  setEndDate,
  onChange,
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
        style={{ backgroundColor: "white" }}
        className="pt-2 pl-1 h-6 mb-0.5"
        onChange={(e) => {
          handleDateSelection({
            value: e.target.value,
            title,
            date,
            setStartDate,
            setEndDate,
            limit,
            onChange,
          });
        }}
      />
    </div>
  );
};
