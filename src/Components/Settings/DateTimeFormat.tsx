import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectVisualSettings,
  setDateTimeFormats,
} from "../../features/general/settingsSlice";

interface Formats {
  timeFormat: string;
  dateFormat: string;
}

const formats = {
  date: {
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
  },
  time: {
    hour12: {
      h_mm_a: "h:mm a",
      h_mm_ss_a: "h:mm:ss a",
    },
    hour24: {
      HH_mm: "HH:mm",
      HH_mm_ss: "HH:mm:ss",
    },
  },
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
      <h2>Date and Time format:</h2>
      <span>Date format: </span>
      <select
        name="date-format-input"
        id="date-format-input"
        value={dateFormat}
        onChange={(e) => {
          setSelectedFormats({ dateFormat: e.target.value, timeFormat });
        }}
      >
        <optgroup label="American">
          <option value={formats.date.american.MM_dd_yyyy}>
            {formats.date.american.MM_dd_yyyy}
          </option>
          <option value={formats.date.american.MMM_dd_yyyy}>
            {formats.date.american.MMM_dd_yyyy}
          </option>
          <option value={formats.date.american.MMMM_dd_yyyy}>
            {formats.date.american.MMMM_dd_yyyy}
          </option>
        </optgroup>
        <optgroup label="International">
          <option value={formats.date.international.dd_MM_yyyy}>
            {formats.date.international.dd_MM_yyyy}
          </option>
          <option value={formats.date.international.d_MMM_yyyy}>
            {formats.date.international.d_MMM_yyyy}
          </option>
          <option value={formats.date.international.d_MMMM_yyyy}>
            {formats.date.international.d_MMMM_yyyy}
          </option>
        </optgroup>
        <optgroup label="ISO 8601">
          <option value={formats.date.ISO_8601.yyyy_MM_dd}>
            {formats.date.ISO_8601.yyyy_MM_dd}
          </option>
        </optgroup>
      </select>
      <span> Time format: </span>
      <select
        name="time-format-input"
        id="time-format-input"
        value={timeFormat}
        onChange={(e) => {
          setSelectedFormats({ dateFormat, timeFormat: e.target.value });
        }}
      >
        <optgroup label="12 hour">
          <option value={formats.time.hour12.h_mm_a}>
            {formats.time.hour12.h_mm_a}
          </option>
          <option value={formats.time.hour12.h_mm_ss_a}>
            {formats.time.hour12.h_mm_ss_a}
          </option>
        </optgroup>
        <optgroup label="24 hour">
          <option value={formats.time.hour24.HH_mm}>
            {formats.time.hour24.HH_mm}
          </option>
          <option value={formats.time.hour24.HH_mm_ss}>
            {formats.time.hour24.HH_mm_ss}
          </option>
        </optgroup>
      </select>{" "}
      <button
        id="date-time-format-save"
        onClick={() => {
          dispatch(setDateTimeFormats(selectedFormats));
        }}
      >
        Save
      </button>
    </div>
  );
};
