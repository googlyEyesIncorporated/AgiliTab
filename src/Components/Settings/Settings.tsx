import { useSelector } from "react-redux";
import { selectVisualSettings } from "../../features/counter/settingsSlice";
import { SetColors } from "./SetColors";
import { DateTimeFormat, restoreDefaults, WorkDay } from "./Static";
import { SetBooleanState } from "./types";

const handleClickOutside =
  (
    setHidden: SetBooleanState,
    { current }: React.MutableRefObject<HTMLDivElement | null>
  ) =>
  (event: Event) => {
    // @ts-ignore
    if (current && !current.contains(event.target)) {
      setHidden(true);
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
  document.addEventListener(
    "click",
    handleClickOutside(setHidden, settingsContainer)
  );
  const { bgColor } = useSelector(selectVisualSettings);

  return (
    <div
      id="customize-selectors"
      className={hideSettings ? "hidden" : ""}
      style={{ backgroundColor: bgColor }}
    >
      <h1 id="customize-corner-title">Customization</h1>
      <SetColors settingsContainer={settingsContainer} />
      {restoreDefaults}
      {WorkDay}
      {DateTimeFormat}
      <div>
        <button
          onClick={() => setHidden(!hideSettings)}
          // id="hide-customize-selectors"
          className="cursor-pointer"
        >
          (Hide)
        </button>
      </div>
    </div>
  );
};
