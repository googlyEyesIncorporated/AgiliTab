import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectVisualSettings } from "../../features/counter/settingsSlice";
import { PopOverGenerator } from "./Popover";

export const SetColors = ({
  settingsContainer: { current },
}: {
  settingsContainer: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const SettingsBoundary = useRef(null);
  const [isBGPopoverOpen, setIsBGPopoverOpen] = useState(false);
  const [isFontPopoverOpen, setIsFontPopoverOpen] = useState(false);
  const [isSecondFontPopoverOpen, setIsSecondFontPopoverOpen] = useState(false);
  const { fontColor, secondFontColor, bgColor } =
    useSelector(selectVisualSettings);

  return (
    <div style={{ margin: "0 0 1rem 0" }} ref={SettingsBoundary}>
      <h2>Colors:</h2>
      <div>
        {PopOverGenerator(
          isBGPopoverOpen,
          setIsBGPopoverOpen,
          current,
          bgColor,
          "bgColor",
          "background-color-selector",
          "Background"
        )}
      </div>
      <div>
        {PopOverGenerator(
          isFontPopoverOpen,
          setIsFontPopoverOpen,
          current,
          fontColor,
          "fontColor",
          "font-color-selector",
          "Font"
        )}
      </div>
      <div>
        {PopOverGenerator(
          isSecondFontPopoverOpen,
          setIsSecondFontPopoverOpen,
          current,
          secondFontColor,
          "secondFontColor",
          "shadow-color-selector",
          "Secondary Font"
        )}
      </div>
    </div>
  );
};
