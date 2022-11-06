import { useState } from "react";

interface Formats {
  time: string;
  date: string;
}

const formats = {
  date: {
    american: {
      MM_DD_YYYY: "MM/DD/YYYY",
      MMM_D_YYYY: "MMM D, YYYY",
      MMMM_D_YYYY: "MMMM D, YYYY",
    },
    international: {
      DD_MM_YYYY: "DD/MM/YYYY",
      D_MMM_YYYY: "D MMM YYYY",
      D_MMMM_YYYY: "D MMMM YYYY",
    },
    ISO_8601: {
      YYYY_MM_DD: "YYYY-MM-DD",
    },
  },
  time: {
    hour12: {
      h_mm: "h:mm",
      h_mm_ss: "h:mm:ss",
    },
    hour24: {
      HH_mm: "HH:mm",
      HH_mm_ss: "HH:mm:ss",
    },
  },
};

export const DateTimeFormat = () => {
  const [selectedFormats, setSelectedFormats] = useState({} as Formats);
  const { date, time } = selectedFormats;

  return (
    <div style={{ margin: "1rem 0" }}>
      <h2>Date and Time format:</h2>
      <span>Date format: </span>
      <select
        name="date-format-input"
        id="date-format-input"
        value={date}
        onChange={(e) => {
          setSelectedFormats({ date: e.target.value, time: time });
        }}
      >
        <optgroup label="American">
          <option value={formats.date.american.MM_DD_YYYY}>
            {formats.date.american.MM_DD_YYYY}
          </option>
          <option value={formats.date.american.MMM_D_YYYY}>
            {formats.date.american.MMM_D_YYYY}
          </option>
          <option value={formats.date.american.MMMM_D_YYYY}>
            {formats.date.american.MMMM_D_YYYY}
          </option>
        </optgroup>
        <optgroup label="International">
          <option value={formats.date.international.DD_MM_YYYY}>
            {formats.date.international.DD_MM_YYYY}
          </option>
          <option value={formats.date.international.D_MMM_YYYY}>
            {formats.date.international.D_MMM_YYYY}
          </option>
          <option value={formats.date.international.D_MMMM_YYYY}>
            {formats.date.international.D_MMMM_YYYY}
          </option>
        </optgroup>
        <optgroup label="ISO 8601">
          <option value={formats.date.ISO_8601.YYYY_MM_DD}>
            {formats.date.ISO_8601.YYYY_MM_DD}
          </option>
        </optgroup>
      </select>
      <span> Time format: </span>
      <select
        name="time-format-input"
        id="time-format-input"
        value={time}
        onChange={(e) => {
          setSelectedFormats({ date: date, time: e.target.value });
        }}
      >
        <optgroup label="12 hour">
          <option value={formats.time.hour12.h_mm}>
            {formats.time.hour12.h_mm}
          </option>
          <option value={formats.time.hour12.h_mm_ss}>
            {formats.time.hour12.h_mm_ss}
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
      <button id="date-time-format-save">Save</button>
    </div>
  );
};
