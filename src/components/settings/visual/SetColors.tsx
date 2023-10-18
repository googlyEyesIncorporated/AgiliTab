import { useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectVisualSettings,
  setVisualSetting,
} from "../../../features/settings/settingsSlice";

export const SetColors = () => {
  const SettingsBoundary = useRef(null);
  const dispatch = useAppDispatch();
  const { fontColor, secondFontColor, bgColor } =
    useAppSelector(selectVisualSettings);

  return (
    <div style={{ margin: "0 0 1rem 0" }} ref={SettingsBoundary}>
      <h2 style={{ marginBottom: "0.5rem" }}>Colors:</h2>
      <div>
        <input
          type="color"
          name="bgColor"
          id="bgColor-picker"
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
