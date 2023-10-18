import { DateTime } from "luxon";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectWorkDayToggle,
  selectWorkingHours,
  setWorkDayHours,
  toggleWorkDay,
} from "../../../features/settings/settingsSlice";
import CheckBox from "../../atoms/CheckBox";

export type SetBooleanState = React.Dispatch<React.SetStateAction<boolean>>;

const handleWorkDayToggle = (
  event: SyntheticEvent & { target: { checked: boolean } },
  dispatch: ReturnType<typeof useAppDispatch>
) => {
  dispatch(toggleWorkDay({ value: event.target.checked }));
};

export const WorkDay = ({
  isPopoverOpen,
  setIsPopoverOpen,
}: {
  isPopoverOpen: boolean;
  setIsPopoverOpen: SetBooleanState;
}) => {
  const dispatch = useAppDispatch();

  const [hours, setHours] = useState({ start: "00:00", end: "12:00" });
  const workDayEnabled = useAppSelector(selectWorkDayToggle);

  const {
    times: { start, end },
  } = useAppSelector(selectWorkingHours);
  useEffect(() => {
    setHours({ start, end });
  }, [start, end]);

  return (
    <div style={{ margin: "0 0 0.5rem 0" }}>
      <h2>Short-term:</h2>
      <div style={{ margin: "0.5rem 0" }}>
        <CheckBox
          className="immune"
          nameId="workday-checkbox"
          checked={workDayEnabled ? true : false}
          onChange={(e) => handleWorkDayToggle(e, dispatch)}
          labelText="Make day timer based on my workday"
          labelClass="pl-5 align-checkbox-label"
        />
      </div>
      <div style={{ display: "inline-block", width: "50%" }}>
        <div>Workday start: </div>
        <input
          type="time"
          name="workday-start"
          id="workday-start-timeinput"
          value={hours.start}
          onChange={(e) => setHours({ start: e.target.value, end: hours.end })}
          className="time-input pt-1 pl-3"
        />
      </div>
      <div style={{ display: "inline-block", width: "50%" }}>
        <div>Workday end: </div>
        <input
          type="time"
          name="workday-end"
          id="workday-end-timeinput"
          value={hours.end}
          onChange={(e) =>
            setHours({ start: hours.start, end: e.target.value })
          }
          className="time-input pt-1 pl-3"
        />{" "}
        <button
          id="workday-time-save"
          className="pt-5 pb-1 px-3 v-align-top button-height"
          onClick={() => {
            setIsPopoverOpen(false);
            const startDate = DateTime.fromFormat(hours.start, "T").toMillis();
            const endDate = DateTime.fromFormat(hours.end, "T").toMillis();
            if (endDate > startDate) {
              dispatch(setWorkDayHours(hours));
            } else {
              setIsPopoverOpen(true);
            }
          }}
        >
          Save
          <div style={{ position: "fixed", overflow: "visible" }}>
            <span
              className={`popover${isPopoverOpen ? "" : " hidden"}`}
              style={{
                margin: "5px",
                border: "1px solid red",
                backgroundColor: "white",
                color: "red",
                position: "absolute",
                width: "max-content",
                left: "calc(0px - 5rem)",
              }}
            >
              Check your times
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
