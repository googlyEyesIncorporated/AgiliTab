import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectVisualSettings,
  setDateTimeFormats,
} from "../../../features/settings/settingsSlice";
import { Sentencecase } from "../../../features/utils/Sentencecase";

interface Formats {
  timeFormat: string;
  dateFormat: string;
}

const dateFormats = {
  american: {
    MM_dd_yyyy: "MM/dd/yyyy",
    MMM_dd_yyyy: "MMM dd, yyyy",
    MMMM_dd_yyyy: "MMMM dd, yyyy",
  },
  international: {
    dd_MM_yyyy: "dd/MM/yyyy",
    d_MMM_yyyy: "d MMM yyyy",
    d_MMMM_yyyy: "d MMMM yyyy",
  },
  ISO_8601: {
    yyyy_MM_dd: "yyyy-MM-dd",
  },
};

const timeFormats = {
  "12 hour": {
    h_mm_a: "h:mm a",
    h_mm_ss_a: "h:mm:ss a",
  },
  "24 hour": {
    HH_mm: "HH:mm",
    HH_mm_ss: "HH:mm:ss",
  },
};

const renderFormats = (
  formatGroup: typeof timeFormats | typeof dateFormats
) => {
  return Object.keys(formatGroup).map((standard) => {
    const listOfFormats = Object.keys(
      formatGroup[standard as keyof typeof formatGroup]
    ).map((format) => {
      const group = formatGroup[standard as keyof typeof formatGroup];
      const thisFormat = group[format as keyof typeof group];
      return (
        <option
          value={thisFormat}
          data-testid={`date-time-format-${thisFormat}`}
          key={thisFormat}
        >
          {DateTime.now().toFormat(thisFormat)}
        </option>
      );
    });
    return (
      <optgroup key={standard} label={Sentencecase(standard)}>
        {listOfFormats}
      </optgroup>
    );
  });
};

export const DateTimeFormat = () => {
  const dispatch = useAppDispatch();
  const [selectedFormats, setSelectedFormats] = useState({} as Formats);
  const { dateFormat, timeFormat } = selectedFormats;
  const { dateFormat: savedDateFormat, timeFormat: savedTimeFormat } =
    useAppSelector(selectVisualSettings);

  useEffect(() => {
    setSelectedFormats({
      dateFormat: savedDateFormat,
      timeFormat: savedTimeFormat,
    });
  }, [savedDateFormat, savedTimeFormat]);

  return (
    <div style={{ margin: "1rem 0" }}>
      <h2 style={{ marginBottom: "0.5rem" }}>Date and Time format:</h2>
      <div style={{ display: "inline-block", width: "50%" }}>
        <div>Date format: </div>
        <select
          className="pt-0.5 pl-0.5 h-6"
          name="date-format-input"
          id="date-format-input"
          data-testid="date-format-input"
          value={dateFormat}
          onChange={(e) => {
            setSelectedFormats({ dateFormat: e.target.value, timeFormat });
          }}
        >
          {renderFormats(dateFormats)}
        </select>
      </div>
      <div style={{ display: "inline-block", width: "50%" }}>
        <div> Time format: </div>
        <select
          className="pt-0.5 pl-0.5 w-32 h-6"
          name="time-format-input"
          id="time-format-input"
          data-testid="time-format-input"
          value={timeFormat}
          onChange={(e) => {
            setSelectedFormats({ dateFormat, timeFormat: e.target.value });
          }}
        >
          {renderFormats(timeFormats)}
        </select>{" "}
        <button
          className="border border-current pt-0.5 pb-0.5 px-1 align-top"
          onClick={() => {
            dispatch(setDateTimeFormats(selectedFormats));
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};
