import { ChangeEvent } from "react";
import { Sentencecase } from "../../features/utils/Sentencecase";
import { UnitTypes } from "../../features/settings/types";

export const RadioButtons = ({
  enabled = true,
  groupId,
  onChange,
  selected = "none",
  firstRadioName,
  secondRadioName,
  thirdRadioName,
}: RadioButtonsProps) => {
  const firstRadioCategory = `group-${groupId}-${firstRadioName}`;
  const secondRadioCategory = `group-${groupId}-${secondRadioName}`;
  const thirdRadioCategory = `group-${groupId}-${thirdRadioName}`;
  return (
    <>
      <input
        type="radio"
        id={firstRadioCategory}
        data-testid={firstRadioCategory}
        value={firstRadioName}
        disabled={!enabled}
        onChange={onChange}
        checked={selected === firstRadioName}
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
        checked={selected === secondRadioName}
      />
      <label
        htmlFor={secondRadioCategory}
        className="text-xs"
      >{` ${Sentencecase(secondRadioName)}`}</label>
      <input
        type="radio"
        id={thirdRadioCategory}
        data-testid={thirdRadioCategory}
        value={thirdRadioName}
        disabled={!enabled}
        onChange={onChange}
        checked={selected === thirdRadioName}
      />
      <label htmlFor={thirdRadioCategory} className="text-xs">{` ${Sentencecase(
        thirdRadioName
      )} `}</label>
    </>
  );
};

interface RadioButtonsProps {
  enabled?: boolean;
  groupId: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  selected?: UnitTypes;
  firstRadioName: string;
  secondRadioName: string;
  thirdRadioName: string;
}
