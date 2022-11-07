import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectVisualSettings,
  setVisualSetting,
} from "../../features/general/settingsSlice";

export const SetColors = () => {
  const SettingsBoundary = useRef(null);
  const dispatch = useDispatch();
  const { fontColor, secondFontColor, bgColor } =
    useSelector(selectVisualSettings);

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
        <label htmlFor="bgColor"> Background Color</label>
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
        <label htmlFor="fontColor"> Font Color</label>
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
        <label htmlFor="secondFontColor"> Secondary Font Color</label>
      </div>
    </div>
  );
};
