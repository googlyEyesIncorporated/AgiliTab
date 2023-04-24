import { useRef, useState } from "react";
import { faGears } from "@fortawesome/free-solid-svg-icons/faGears";
import { useAppSelector } from "../../app/hooks";

import { selectVisualSettings } from "../../features/Settings/settingsSlice";
import { Settings } from "./Settings";
import Icon from "../Atoms/Icon";

export const SettingsWrapper = () => {
  const { secondFontColor } = useAppSelector(selectVisualSettings);
  const [hideSettings, setHidden] = useState(true);
  const settingsContainer = useRef(null as HTMLDivElement | null);

  return (
    <div id="customize-corner" ref={settingsContainer}>
      <Icon
        onClick={() => setHidden(!hideSettings)}
        faId="customize-button"
        icon={faGears}
        faStyle={{ color: secondFontColor }}
        faClassName={`${!hideSettings ? " hidden" : ""}`}
      />
      <Settings
        settingsContainer={settingsContainer}
        hideSettings={hideSettings}
        setHidden={setHidden}
      />
    </div>
  );
};