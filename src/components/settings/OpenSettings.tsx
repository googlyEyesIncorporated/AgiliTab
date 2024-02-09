import { useRef, useState } from "react";
import { faGears } from "@fortawesome/free-solid-svg-icons/faGears";
import { Settings } from ".";
import Icon from "../atoms/Icon";

export const SettingsWrapper = () => {
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
