import { ChangeEvent } from "react";
import { Sentencecase } from "../../features/utils/Sentencecase";

export const RadioButtons = ({
  enabled = true,
  groupId,
  firstIsChecked,
  onChange,
  firstRadioName,
  secondRadioName,
}: RadioButtonsProps) => {
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
        onChange={onChange}
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
        onChange={onChange}
        checked={!firstIsChecked}
      />
      <label
        htmlFor={secondRadioCategory}
        className="text-xs"
      >{` ${Sentencecase(secondRadioName)}`}</label>
    </>
  );
};

interface RadioButtonsProps {
  enabled?: boolean;
  groupId: number;
  firstIsChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  firstRadioName: string;
  secondRadioName: string;
}
