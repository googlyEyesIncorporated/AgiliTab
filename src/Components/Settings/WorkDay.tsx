import { DateTime } from "luxon";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Popover } from "react-tiny-popover";
import {
  selectWorkDayToggle,
  selectWorkingHours,
  setWorkDayHours,
  toggleWorkDay,
} from "../../features/general/settingsSlice";
import { SetBooleanState } from "./types";

const handleChecked = (
  event: SyntheticEvent & { target: { checked: boolean } },
  dispatch: ReturnType<typeof useAppDispatch>
) => {
  dispatch(toggleWorkDay({ value: event.target.checked }));
};

export const WorkDay = ({
  settingsContainer: { current },
  popover,
}: {
  popover: { isOpen: boolean; setIsOpen: SetBooleanState };
  settingsContainer: React.MutableRefObject<HTMLDivElement | null>;
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
    <div style={{ margin: "1rem 0" }}>
      <h2>Workday:</h2>
      <input
        type="checkbox"
        name="workday-on"
        className="immune"
        id="workday-checkbox"
        {...(workDayEnabled ? { checked: true } : { checked: false })}
        onChange={(e) => handleChecked(e, dispatch)}
      />
      <label htmlFor="workday-on">Make day timer based on my workday:</label>
      <div>
        <span>Workday start: </span>
        <input
          type="time"
          name="workday-start"
          id="workday-start-timeinput"
          value={hours.start}
          onChange={(e) => setHours({ start: e.target.value, end: hours.end })}
          className="time-input"
        />
        <span> - Workday end: </span>
        <input
          type="time"
          name="workday-end"
          id="workday-end-timeinput"
          value={hours.end}
          onChange={(e) =>
            setHours({ start: hours.start, end: e.target.value })
          }
          className="time-input"
        />{" "}
        <Popover
          isOpen={popover.isOpen}
          positions={["bottom"]}
          parentElement={current || undefined}
          content={
            <span
              style={{
                margin: "2px",
                border: "red 1px solid",
                backgroundColor: "white",
                color: "red",
              }}
            >
              Check your times
            </span>
          }
          align={"end"}
        >
          <button
            id="workday-time-save"
            onClick={() => {
              popover.setIsOpen(false);
              const startDate = DateTime.fromFormat(
                hours.start,
                "T"
              ).toMillis();
              const endDate = DateTime.fromFormat(hours.end, "T").toMillis();
              if (endDate > startDate) {
                dispatch(setWorkDayHours(hours));
              } else {
                popover.setIsOpen(true);
              }
            }}
          >
            Save
          </button>
        </Popover>
      </div>
    </div>
  );
};
