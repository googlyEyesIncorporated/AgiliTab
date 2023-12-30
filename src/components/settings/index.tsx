import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectVisualSettings } from "../../features/settings/settingsSlice";
import { SetColors } from "./visual/SetColors";
import { DateTimeFormat } from "./visual/DateTimeFormat";
import { SetBooleanState } from "./term/WorkDay";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import Icon from "../atoms/Icon";
import { InfoBox } from "./info";

const handleClickOutside =
  (
    setHidden: SetBooleanState,
    setIsInfoOpen: SetBooleanState,
    { current }: React.MutableRefObject<HTMLDivElement | null>
  ) =>
  (event: Event) => {
    if (current && !current.contains(event.target as Node)) {
      setHidden(true);
      setIsInfoOpen(false);
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
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    document.addEventListener(
      "click",
      handleClickOutside(setHidden, setIsInfoOpen, settingsContainer)
    );
    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside(setHidden, setIsInfoOpen, settingsContainer)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run on mount only
  }, []);

  const { bgColor, secondFontColor } = useAppSelector(selectVisualSettings);

  return (
    <div
      className={`p-2 overflow-auto xl:min-w-25vw text-xs leading-normal border border-current shadow-2xl${
        hideSettings ? " hidden" : ""
      }`}
      data-testid="hideable-settings"
      style={{ backgroundColor: bgColor }}
    >
      {isInfoOpen && <InfoBox />}
      <h1 className="font-bold text-2xl leading-none" id="settings-title">
        Customization
      </h1>
      <SetColors />
      <hr style={{ borderColor: "inherit" }} />
      <DateTimeFormat />
      <div>
        <button
          onClick={() => setHidden(!hideSettings)}
          className="border border-current cursor-pointer pt-0.5 px-1"
          data-testid="hide-button"
        >
          ( Hide )
        </button>
        <Icon
          onClick={() => {
            setIsInfoOpen(!isInfoOpen);
          }}
          icon={faCircleInfo}
          faClassName="text-base my-0 mx-2.5"
          faStyle={{
            color: secondFontColor,
          }}
          iconClassName={`info-circle float-right`}
          data-testid="info-icon"
        />
      </div>
    </div>
  );
};
