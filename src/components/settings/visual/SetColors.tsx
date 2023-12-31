import { useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  resetVisualSetting,
  selectVisualSettings,
  setVisualSetting,
} from "../../../features/settings/settingsSlice";
import Icon from "../../atoms/Icon";
import { faRandom } from "@fortawesome/free-solid-svg-icons/faRandom";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { generateAndDispatchRandomColors } from "./GenerateRandomColors";

export const SetColors = () => {
  const SettingsBoundary = useRef(null);
  const dispatch = useAppDispatch();
  const { fontColor, secondFontColor, bgColor } =
    useAppSelector(selectVisualSettings);

  return (
    <div className="mt-2 mb-4 mx-0" ref={SettingsBoundary}>
      <h2 className="mb-2 text-lg font-bold leading-none">
        Colors:
        <Icon
          onClick={() => generateAndDispatchRandomColors(dispatch)}
          icon={faRandom}
          title="Generate Random Colors"
          faStyle={{
            color: secondFontColor,
          }}
          iconClassName="float-right text-base leading-none my-0 mx-2.5"
        />
        <Icon
          onClick={() => dispatch(resetVisualSetting())}
          icon={faArrowRightFromBracket}
          title="Restore Default Colors"
          faStyle={{ color: secondFontColor }}
          iconClassName="float-right text-base leading-none"
        />
      </h2>
      <div>
        <input
          type="color"
          name="bgColor"
          id="bgColor-picker"
          className="cursor-pointer"
          data-testid="bgColor-picker"
          value={bgColor}
          onChange={(e) =>
            dispatch(
              setVisualSetting({ key: "bgColor", value: e.target.value })
            )
          }
        />
        <label htmlFor="bgColor-picker"> Background Color</label>
      </div>
      <div>
        <input
          type="color"
          name="fontColor"
          id="fontColor-picker"
          className="cursor-pointer"
          value={fontColor}
          onChange={(e) =>
            dispatch(
              setVisualSetting({ key: "fontColor", value: e.target.value })
            )
          }
        />
        <label htmlFor="fontColor-picker"> Font Color</label>
      </div>
      <div>
        <input
          type="color"
          name="secondFontColor"
          id="secondFontColor-picker"
          className="cursor-pointer"
          value={secondFontColor}
          onChange={(e) =>
            dispatch(
              setVisualSetting({
                key: "secondFontColor",
                value: e.target.value,
              })
            )
          }
        />
        <label htmlFor="secondFontColor-picker"> Secondary Font Color</label>
      </div>
    </div>
  );
};
