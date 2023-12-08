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
    <div style={{ margin: "0 0 1rem 0" }} ref={SettingsBoundary}>
      <h2 style={{ marginBottom: "0.5rem" }}>
        Colors:
        <Icon
          onClick={() => generateAndDispatchRandomColors(dispatch)}
          icon={faRandom}
          title="Generate Random Colors"
          faStyle={{
            color: secondFontColor,
            fontSize: "1rem",
            margin: "0 10px",
          }}
          iconClassName={`float-right`}
        />
        <Icon
          onClick={() => dispatch(resetVisualSetting())}
          icon={faArrowRightFromBracket}
          title="Restore Default Colors"
          faStyle={{ color: secondFontColor, fontSize: "1rem" }}
          iconClassName={`float-right`}
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
