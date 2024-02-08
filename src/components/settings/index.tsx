import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectVisualSettings } from "../../features/settings/settingsSlice";
import { SetColors } from "./visual/SetColors";
import { DateTimeFormat } from "./visual/DateTimeFormat";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import Icon from "../atoms/Icon";
import { InfoBox } from "./info";
import { handleClickOutside } from "../../features/utils/handleClickOutside";
import { SetBooleanState } from "../../app/commonTypes";

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
    const handleClick = () => {
      setHidden(true);
      setIsInfoOpen(false);
    };
    document.addEventListener(
      "click",
      handleClickOutside(handleClick, settingsContainer)
    );
    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside(handleClick, settingsContainer)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run on mount only
  }, []);

  const { bgColor, secondFontColor } = useAppSelector(selectVisualSettings);

  return (
    <div
      className={`p-2 overflow-auto min-w-72 text-xs leading-normal border border-current shadow-2xl${
        hideSettings ? " hidden" : ""
      }`}
      data-testid="hideable-settings"
      style={{ backgroundColor: bgColor }}
    >
      {isInfoOpen && <InfoBox />}
      <h1 className="text-xl" id="settings-title">
        Customization
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
      </h1>
      <hr style={{ borderColor: "inherit" }} />
      <SetColors />
      <hr style={{ borderColor: "inherit" }} />
      <DateTimeFormat />
    </div>
  );
};
