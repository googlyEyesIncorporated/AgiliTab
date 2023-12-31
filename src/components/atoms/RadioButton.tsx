import { ChangeEvent } from "react";
import { Sentencecase } from "../../features/utils/Sentencecase";

interface RadioButtonProps {
  enabled: boolean;
  groupId: number;
  firstIsChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  firstRadioName: string;
  secondRadioName: string;
}

const RadioButton = ({
  enabled,
  groupId,
  firstIsChecked,
  setIsChecked,
  firstRadioName,
  secondRadioName,
}: RadioButtonProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.currentTarget.value === firstRadioName;
    setIsChecked(isChecked);
  };
  const firstRadioCategory = `group-${groupId}-${firstRadioName}`;
  const secondRadioCategory = `group-${groupId}-${secondRadioName}`;
  return (
    <>
      <input
        type="radio"
        id={firstRadioCategory}
        data-testid={firstRadioCategory}
        value={firstRadioName}
        disabled={!enabled}
        onChange={handleChange}
        checked={firstIsChecked}
      />
      <label htmlFor={firstRadioCategory} className="text-xs">{` ${Sentencecase(
        firstRadioName
      )} `}</label>
      <input
        type="radio"
        id={secondRadioCategory}
        data-testid={secondRadioCategory}
        value={secondRadioName}
        disabled={!enabled}
        onChange={handleChange}
        checked={!firstIsChecked}
      />
      <label
        htmlFor={secondRadioCategory}
        className="text-xs"
      >{` ${Sentencecase(secondRadioName)}`}</label>
    </>
  );
};
export default RadioButton;
