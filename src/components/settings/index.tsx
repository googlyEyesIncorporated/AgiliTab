import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectLongTerm,
  selectMediumTerm,
  selectVisualSettings,
} from "../../features/settings/settingsSlice";
import { RestoreDefaults } from "./visual/RestoreDefaults";
import { SetColors } from "./visual/SetColors";
import { DateTimeFormat } from "./visual/DateTimeFormat";
import { WorkDay, SetBooleanState } from "./term/WorkDay";
import { TermInputs } from "./term/TermInputs";

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
  const { bgColor } = useAppSelector(selectVisualSettings);

  const mediumTerm = useAppSelector(selectMediumTerm);
  const longTerm = useAppSelector(selectLongTerm);

  return (
    <div
      id="customize-selectors"
      className={hideSettings ? "hidden" : ""}
      style={{ backgroundColor: bgColor }}
    >
      <h1 id="customize-corner-title">Customization</h1>
      <SetColors />
      <RestoreDefaults />
      <DateTimeFormat />
      <hr />
      <div style={{ margin: "1rem 0" }} id="customizable-units">
        <h2 style={{ fontSize: "2em" }}>Time Frames:</h2>
        <WorkDay popover={{ setIsOpen, isOpen }} />
        <TermInputs category="medium" termData={mediumTerm} />
        <TermInputs category="long" termData={longTerm} />
      </div>{" "}
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
