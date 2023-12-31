import { useAppDispatch } from "../../../app/hooks";
import { setVisualSetting } from "../../../features/settings/settingsSlice";

const rgbVal = () => {
  const r = getHexValue(Math.floor(Math.random() * 256)); // NOSONAR
  const g = getHexValue(Math.floor(Math.random() * 256)); // NOSONAR
  const b = getHexValue(Math.floor(Math.random() * 256)); // NOSONAR

  return `#${r}${g}${b}`;
};

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
  const firstValue = hexMap[valueSixteenth] ?? valueSixteenth;
  const secondValue = hexMap[secondValueSixteenth] ?? secondValueSixteenth;
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
