import { useRef, useState } from "react";
import { faGears } from "@fortawesome/free-solid-svg-icons/faGears";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { Settings } from ".";
import Icon from "../atoms/Icon";
import { useAppDispatch } from "../../app/hooks";
import { addTerm } from "../../features/itemList/itemListSlice";
import { generateNewList } from "../../features/utils/generateNewList";

export const SettingsWrapper = () => {
  const [hidden, setHidden] = useState(true);
  const settingsContainer = useRef(null as HTMLDivElement | null);
  const dispatch = useAppDispatch();

  return (
    <div className="fixed left-0 bottom-0 m-4" ref={settingsContainer}>
      <div data-testid="add-group" className="text-center mb-2">
        <Icon
          onClick={() => dispatch(addTerm(generateNewList()))}
          icon={faPlus}
          faClassName={`fade-in-1s text-double cursor-pointer${
            !hidden ? " hidden" : ""
          }`}
        />
      </div>
      <div data-testid="settings">
        <Icon
          onClick={() => setHidden(!hidden)}
          icon={faGears}
          faClassName={`fade-in-1s text-double cursor-pointer${
            !hidden ? " hidden" : ""
          }`}
        />
      </div>
      <Settings
        settingsContainer={settingsContainer}
        hideSettings={hidden}
        setHidden={setHidden}
      />
    </div>
  );
};
