export const DateTimeFormat = (
  <div style={{ margin: "1rem 0" }}>
    <h2>Date and Time format:</h2>
    <span>Date format: </span>
    <select name="date-format-input" id="date-format-input">
      <optgroup label="American">
        <option>MM/DD/YYYY</option>
        <option>MMM D, YYYY</option>
        <option>MMMM D, YYYY</option>
      </optgroup>
      <optgroup label="International">
        <option>DD/MM/YYYY</option>
        <option>D MMM YYYY</option>
        <option>D MMMM YYYY</option>
      </optgroup>
      <optgroup label="ISO 8601">
        <option>YYYY-MM-DD</option>
      </optgroup>
    </select>
    <span> Time format: </span>
    <select name="time-format-input" id="time-format-input">
      <optgroup label="12 hour">
        <option>h:mm A</option>
        <option>h:mm:ss A</option>
      </optgroup>
      <optgroup label="24 hour">
        <option>HH:mm</option>
        <option>HH:mm:ss</option>
      </optgroup>
    </select>{" "}
    <button id="date-time-format-save">Save</button>
  </div>
);

export const WorkDay = (
  <div style={{ margin: "1rem 0" }}>
    <h2>Workday:</h2>
    <input
      type="checkbox"
      name="workday-on"
      className="immune"
      id="workday-checkbox"
    />
    <label htmlFor="workday-on">Make day timer based on my workday:</label>
    <div>
      <span>Workday start: </span>
      <input
        type="time"
        name="workday-start"
        id="workday-start-timeinput"
        // value="09:00"
        className="time-input"
      />
      <span> - Workday end: </span>
      <input
        type="time"
        name="workday-end"
        id="workday-end-timeinput"
        // value="18:00"
        className="time-input"
      />{" "}
      <button id="workday-time-save">Save</button>
    </div>
  </div>
);
