import { ChangeEvent } from "react";
import { Sentencecase } from "../../features/utils/Sentencecase";

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
    const isChecked = e.currentTarget.value === firstRadioName;
    setIsChecked(isChecked);
  };
  return (
    <>
      <input
        type="radio"
        id={`${category}-${firstRadioName}`}
        value={firstRadioName}
        disabled={!enabled}
        onChange={handleChange}
        checked={firstIsChecked}
      />
      <label htmlFor={`${category}-${firstRadioName}`}>{` ${Sentencecase(
        firstRadioName
      )} `}</label>
      <input
        type="radio"
        id={`${category}-${secondRadioName}`}
        value={secondRadioName}
        disabled={!enabled}
        onChange={handleChange}
        checked={!firstIsChecked}
      />
      <label htmlFor={`${category}-${secondRadioName}`}>{` ${Sentencecase(
        secondRadioName
      )}`}</label>
    </>
  );
};
export default RadioButton;
