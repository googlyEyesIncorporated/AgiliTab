import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNotShortTerm } from "../../features/general/settingsSlice";
import { UnitType } from "../../features/general/types";

const formats = {
  units: {
    DAY: "Day",
    WEEK: "Week",
    SPRINT: "Sprint",
    MONTH: "Month",
    QUARTER: "Quarter",
    SEMESTER: "Semester",
    PERIOD: "Period",
    YEAR: "Year",
  },
};

const Totitlecase = (string: string) => {
  const firstLetter = string.slice(0, 1);
  return `${firstLetter.toUpperCase()}${string.slice(1, string.length)}`;
};

export const TermInputs = ({
  category,
  termData,
}: {
  category: "medium" | "long";
  termData: UnitType;
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [unitType, setUnitType] = useState("");
  const [qty, setQty] = useState(0);
  const [unit, setUnit] = useState("");
  const [startDate, setStartDate] = useState("");
  useEffect(() => {
    setUnitType(termData.title.toLowerCase());
    setTitle(termData.title);
    setQty(termData.duration.qty);
    setUnit(termData.duration.unit);
  }, [termData]);
  return (
    <div style={{ margin: "0.5rem 0" }}>
      <h2>{`${Totitlecase(category)}-term: `}</h2>
      <div style={{ margin: "0.5rem 0" }}>
        <label htmlFor={`${category}-unit-name`}>Name: </label>
        <select
          name="date-unit-name"
          id="date-unit-name"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setUnitType(e.target.value.toLowerCase());
          }}
        >
          {Object.keys(formats.units).map((unit) => {
            if (
              formats.units[unit as keyof typeof formats.units] !==
              formats.units.DAY
            ) {
              return (
                <option
                  value={formats.units[unit as keyof typeof formats.units]}
                >
                  {formats.units[unit as keyof typeof formats.units]}
                </option>
              );
            }
            return null;
          })}
        </select>
      </div>

      <label htmlFor={`${category}-unit-reference`}>Start date: </label>
      <input
        type="date"
        name={`${category}-unit-reference`}
        id={`${category}-unit-reference`}
        value={startDate}
        onChange={(e) => {
          setStartDate(e.target.value);
        }}
      />
      <label htmlFor={`${category}-unit-qty`}> - Duration: </label>
      <input
        type="number"
        name={`${category}-unit-qty`}
        id={`${category}-unit-qty`}
        min="1"
        max="100"
        style={{ width: "3rem" }}
        value={qty}
        onChange={(e) => {
          setQty(parseInt(e.target.value));
        }}
      />
      <select
        name="date-format-input"
        id="date-format-input"
        value={unit}
        onChange={(e) => {
          setUnit(e.target.value);
        }}
      >
        <option value={formats.units.DAY + "s"}>{formats.units.DAY}s</option>
        <option value={formats.units.WEEK + "s"}>{formats.units.WEEK}s</option>
        <option value={formats.units.MONTH + "s"}>
          {formats.units.MONTH}s
        </option>
        <option value={formats.units.YEAR + "s"}>{formats.units.YEAR}s</option>
      </select>
      <button
        id="date-time-format-save"
        onClick={() => {
          dispatch(
            setNotShortTerm({
              key: `${category}Term`,
              termObj: { duration: { qty, unit }, startDate, unitType, title },
            })
          );
        }}
      >
        Save
      </button>
    </div>
  );
};
