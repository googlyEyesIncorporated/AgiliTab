import { useAppDispatch } from "../../../app/hooks";
import { setVisualSetting } from "../../../features/settings/settingsSlice";

const rgbVal = () =>
  `#${getHexValue(Math.floor(Math.random() * 256))}${getHexValue(
    Math.floor(Math.random() * 256)
  )}${getHexValue(Math.floor(Math.random() * 256))}`;

const hexMap: Record<number, string> = {
  10: "A",
  11: "B",
  12: "C",
  13: "D",
  14: "E",
  15: "F",
};

const getHexValue = (value: number) => {
  const valueSixteenth = Math.floor(value / 16);
  const secondValueSixteenth = value % 16;
  const firstValue = hexMap[valueSixteenth] || valueSixteenth;
  const secondValue = hexMap[secondValueSixteenth] || secondValueSixteenth;
  return `${firstValue}${secondValue}`;
};

export const generateAndDispatchRandomColors = (
  dispatch: ReturnType<typeof useAppDispatch>
) => {
  dispatch(
    setVisualSetting({
      key: "fontColor",
      value: rgbVal(),
    })
  );
  dispatch(
    setVisualSetting({
      key: "secondFontColor",
      value: rgbVal(),
    })
  );
  dispatch(
    setVisualSetting({
      key: "bgColor",
      value: rgbVal(),
    })
  );
};

export const GenerateRandomColors = () => {
  const dispatch = useAppDispatch();

  return (
    <span>
      <button
        id="generate-random-colors"
        className="cursor-pointer px-3 pt-3 pb-3 button-height"
        onClick={() => generateAndDispatchRandomColors(dispatch)}
      >
        Generate random colors
      </button>
    </span>
  );
};
