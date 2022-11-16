import { ChangeEvent } from "react";
import { titleCase } from "../../features/utils/titleCase";

interface RadioButtonProps {
  enabled: boolean;
  category: string;
  firstIsChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  firstRadioName: string;
  secondRadioName: string;
}

const RadioButton = ({
  enabled,
  category,
  firstIsChecked,
  setIsChecked,
  firstRadioName,
  secondRadioName,
}: RadioButtonProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.currentTarget.value === firstRadioName ? true : false;
    setIsChecked(isChecked);
  };
  return (
    <>
      <input
        type="radio"
        id={`${category}-${firstRadioName}`}
        value={firstRadioName}
        disabled={enabled ? false : true}
        onChange={handleChange}
        checked={firstIsChecked}
      />
      <label htmlFor={`${category}-${firstRadioName}`}>{` ${titleCase(
        firstRadioName
      )} `}</label>
      <input
        type="radio"
        id={`${category}-${secondRadioName}`}
        value={secondRadioName}
        disabled={enabled ? false : true}
        onChange={handleChange}
        checked={!firstIsChecked}
      />
      <label htmlFor={`${category}-${secondRadioName}`}>{` ${titleCase(
        secondRadioName
      )}`}</label>
    </>
  );
};
export default RadioButton;
