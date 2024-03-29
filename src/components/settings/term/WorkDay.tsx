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
    <div className="mt-0 mx-0 mb-2">
      <h2 className="font-bold text-lg leading-none">Short-term:</h2>
      <div className="my-2 mx-0 leading-none">
        <CheckBox
          className="immune align-middle"
          nameId="workday-checkbox"
          checked={workDayEnabled}
          onChange={(e) => handleWorkDayToggle(e, dispatch)}
          labelText="Make day timer based on my workday"
          labelClass="pl-2 bottom-[-2px] align-middle relative"
        />
      </div>
      <div className="w-1/2 inline-block">
        <div>Workday start: </div>
        <input
          type="time"
          name="workday-start"
          value={hours.start}
          onChange={(e) => setHours({ start: e.target.value, end: hours.end })}
          className="items-end w-32 pt-0.5 pl-1"
        />
      </div>
      <div className="w-1/2 inline-block">
        <div>Workday end: </div>
        <input
          type="time"
          name="workday-end"
          value={hours.end}
          onChange={(e) =>
            setHours({ start: hours.start, end: e.target.value })
          }
          className="items-end w-32 pt-0.5 pl-1"
        />{" "}
        <button
          className="border border-current pt-0.5 px-1 align-top"
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
          <div className="fixed overflow-visible">
            <span
              className={`popover absolute border w-max m-[5px] bg-white border-red-500 text-red-500${
                isPopoverOpen ? "" : " hidden"
              }`}
              style={{
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
