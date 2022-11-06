import { useState } from "react";
import { useSelector } from "react-redux";
import { selectVisualSettings } from "../../features/general/settingsSlice";
import { RestoreDefaults } from "./RestoreDefaults";
import { SetColors } from "./SetColors";
import { DateTimeFormat } from "./DateTimeFormat";
import { SetBooleanState } from "./types";
import { WorkDay } from "./WorkDay";

const handleClickOutside =
  (
    setHidden: SetBooleanState,
    setIsOpen: SetBooleanState,
    { current }: React.MutableRefObject<HTMLDivElement | null>
  ) =>
  (event: Event) => {
    // @ts-ignore
    if (current && !current.contains(event.target)) {
      setHidden(true);
      setIsOpen(false);
    }
  };

export const Settings = ({
  settingsContainer,
  hideSettings,
  setHidden,
}: {
  settingsContainer: React.MutableRefObject<HTMLDivElement | null>;
  hideSettings: boolean;
  setHidden: SetBooleanState;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  document.addEventListener(
    "click",
    handleClickOutside(setHidden, setIsOpen, settingsContainer)
  );
  const { bgColor } = useSelector(selectVisualSettings);

  return (
    <div
      id="customize-selectors"
      className={hideSettings ? "hidden" : ""}
      style={{ backgroundColor: bgColor }}
    >
      <h1 id="customize-corner-title">Customization</h1>
      <SetColors />
      <RestoreDefaults />
      <WorkDay
        settingsContainer={settingsContainer}
        popover={{ setIsOpen, isOpen }}
      />
      <DateTimeFormat />
      <div>
        <button
          onClick={() => setHidden(!hideSettings)}
          className="cursor-pointer"
        >
          (Hide)
        </button>
      </div>
    </div>
  );
};
