import { DateTime } from "luxon";

type Limit = Partial<Record<"min" | "max", string>>;
interface commonProps {
  date: string;
  title: "Beginning" | "End";
  limit: Limit;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  enabled: boolean;
}

interface SelectDateProps extends commonProps {
  category: string;
}
interface HandleDateSelection extends commonProps {
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
        setStartDate(DateTime.fromISO(value).toISO());
        setEndDate(DateTime.fromISO(value).plus(duration).toISO());
      }
    } else {
      setEndDate(DateTime.fromISO(value).toISO());
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
    formattedLimit.min = DateTime.fromISO(limit.min).toISODate();
  }
  return (
    <div style={{ display: "inline-block", width: "50%" }}>
      <label htmlFor={`${category}-${title}-datepicker`}> {title}: </label>
      <input
        type="date"
        {...formattedLimit}
        id={`${category}-${title}-datepicker`}
        name={`${category}-${title}-datepicker`}
        value={DateTime.fromISO(date).toISODate()}
        style={{ backgroundColor: enabled ? "ButtonFace" : "darkgray" }}
        disabled={enabled ? false : true}
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

// Keep for one commit then remove
// import { useEffect, useState } from "react";
// import { months } from "../timeLeftBox/dateData";

// const getEndOfMonth = (month: number) => {
//   let lastDay = 0;
//   if (month) {
//     const thisYear = DateTime.now().year;
//     const dateTimeFromMonth = DateTime.fromObject({
//       year: thisYear,
//       month,
//       day: 25,
//     });
//     // const dateTimeFromMonth = DateTime.fromISO(`${thisYear}-${month}-25`);
//     const endOfMonth = dateTimeFromMonth.endOf("month");
//     lastDay = endOfMonth.day;
//   }
//   return lastDay;
// };

// const [month, setMonth] = useState(0);
// const [day, setDay] = useState(0);
// const daysArray = [];
// const daysInMonth = getEndOfMonth(month);
// for (let i = 0; i < daysInMonth; i++) {
//   daysArray.push(i + 1);
// }
// const { month: startMonth, day: startDay } = date;
// useEffect(() => {
//   // setMonth(startMonth);
//   // setDay(startDay);
// }, [startDay, startMonth]);
// // const year = DateTime.now().year;

// const updateStartDate = ({ month, day }: { month: number; day: number }) => {
//   if (month && day && year)
//     setDate(DateTime.fromObject({ year, month, day }).toObject());
// };

// {
/* <label htmlFor="select-month">{title}: </label>
      <select
        name="select-month"
        value={month}
        id="select-month"
        style={{ backgroundColor: enabled ? "ButtonFace" : "darkgray" }}
        onChange={(e) => {
          if (enabled) {
            const month = parseInt(e.target.value);
            setMonth(month);
            updateStartDate({ day, month });
          }
        }}
      >
        {months.map((month, index) => {
          if (index) return <option value={index}>{month}</option>;
          return null;
        })}
      </select>
      <select
        name="select-day"
        id="select-day"
        value={day}
        style={{ backgroundColor: enabled ? "ButtonFace" : "darkgray" }}
        onChange={(e) => {
          if (enabled) {
            const day = parseInt(e.target.value);
            setDay(day);
            updateStartDate({ day, month });
          }
        }}
      >
        {daysArray.map((day) => {
          return (
            <option key={day} value={day}>
              {day}
            </option>
          );
        })}
      </select> */
// }
