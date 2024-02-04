import { DateTime } from "luxon";
import { DATE_TIME_NO_SECONDS } from "../../../commonUtils";

type Limit = Partial<Record<"min" | "max", string>>;
interface CommonProps {
  onChange: (changed: any) => void;
}

interface SelectDateProps extends CommonProps {
  title: "Beginning" | "End";
  groupId: number;
  date: string;
  limit: Limit;
}

export const SelectDate = ({
  date,
  title,
  groupId,
  limit,
  onChange,
}: SelectDateProps) => {
  const formattedLimit: Limit = {};
  if ("min" in limit && limit.min) {
    formattedLimit.min =
      DateTime.fromISO(limit.min).toFormat(DATE_TIME_NO_SECONDS) ?? undefined;
  }
  const categoryDatePicker = `group-${groupId}-${title.toLowerCase()}-datepicker`;
  return (
    <div className="mx-auto">
      <label
        className="inline-block w-[61px] my-auto"
        htmlFor={categoryDatePicker}
      >
        {title}:
      </label>
      <input
        type="datetime-local"
        {...formattedLimit}
        id={categoryDatePicker}
        data-testid={categoryDatePicker}
        name={categoryDatePicker}
        value={date ?? ""}
        style={{ backgroundColor: "white" }}
        onChange={(e) => {
          if (DateTime.fromISO(e.target.value).isValid)
            if (title === "Beginning") {
              onChange({ startDate: e.target.value });
            } else {
              onChange({ endDate: e.target.value });
            }
        }}
      />
    </div>
  );
};
