import { useRef, useState } from "react";
import { faGears } from "@fortawesome/free-solid-svg-icons/faGears";
import { useAppSelector } from "../../app/hooks";

import { selectVisualSettings } from "../../features/settings/settingsSlice";
import { Settings } from ".";
import Icon from "../atoms/Icon";

export const SettingsWrapper = () => {
  const { secondFontColor } = useAppSelector(selectVisualSettings);
  const [hidden, setHidden] = useState(true);
  const settingsContainer = useRef(null as HTMLDivElement | null);

  return (
    <div
      data-testid="settings"
      className="fixed left-0 bottom-0 m-4"
      ref={settingsContainer}
    >
      <Icon
        onClick={() => setHidden(!hidden)}
        icon={faGears}
        faStyle={{ color: secondFontColor }}
        faClassName={`fade-in-1s text-double cursor-pointer${
          !hidden ? " hidden" : ""
        }`}
      />
      <Settings
        settingsContainer={settingsContainer}
        hideSettings={hidden}
        setHidden={setHidden}
      />
    </div>
  );
};
