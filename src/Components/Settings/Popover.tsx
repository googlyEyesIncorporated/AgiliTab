import { HexColorPicker } from "react-colorful";
import { Popover } from "react-tiny-popover";
import { useAppDispatch } from "../../app/hooks";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setVisualSetting } from "../../features/general/settingsSlice";
import { SetBooleanState } from "./types";
import { Visual } from "../../features/general/types";

export const PopOverGenerator = (
  isOpen: boolean,
  setIsOpen: SetBooleanState,
  current: HTMLDivElement | null,
  color: string,
  visualKey: keyof Visual,
  id: string,
  text: string
) => {
  const dispatch = useAppDispatch();
  return (
    <Popover
      isOpen={isOpen}
      align={"start"}
      positions={["bottom"]}
      onClickOutside={() => setIsOpen(false)}
      boundaryElement={current || undefined}
      parentElement={current || undefined}
      content={
        <div>
          <HexColorPicker
            color={color}
            onChange={(hexColor) =>
              dispatch(setVisualSetting({ key: visualKey, value: hexColor }))
            }
          />
        </div>
      }
    >
      <button
        id={id}
        className="color-selector-label cursor-pointer"
        style={{ visibility: "visible", fontWeight: "normal" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {text}
        <i aria-hidden="true">
          <FontAwesomeIcon icon={faChevronRight} />
        </i>
      </button>
    </Popover>
  );
};
