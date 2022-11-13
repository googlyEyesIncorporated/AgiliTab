import { useRef, useState } from "react";
import { faGears } from "@fortawesome/free-solid-svg-icons/faGears";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../app/hooks";

import { selectVisualSettings } from "../features/Settings/settingsSlice";
import { Settings } from "./Settings/Settings";

export const SettingsWrapper = () => {
  const { secondFontColor } = useAppSelector(selectVisualSettings);
  const [hideSettings, setHidden] = useState(true);
  const settingsContainer = useRef(null as HTMLDivElement | null);

  return (
    <div id="customize-corner" ref={settingsContainer}>
      <FontAwesomeIcon
        onClick={() => setHidden(!hideSettings)}
        id="customize-button"
        icon={faGears}
        style={{ color: secondFontColor }}
        className={`${!hideSettings ? " hidden" : ""}`}
      />
      <Settings
        settingsContainer={settingsContainer}
        hideSettings={hideSettings}
        setHidden={setHidden}
      />
    </div>
  );
};
