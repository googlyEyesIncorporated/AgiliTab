import { useAppSelector } from "../../app/hooks";
import {
  selectLongTerm,
  selectMediumTerm,
} from "../../features/general/settingsSlice";
import { TermInputs } from "./TermInputs";
import { SetBooleanState } from "./types";
import { WorkDay } from "./WorkDay";

export const CustomizableUnits = (props: {
  popover: { isOpen: boolean; setIsOpen: SetBooleanState };
}) => {
  const mediumTerm = useAppSelector(selectMediumTerm);
  const longTerm = useAppSelector(selectLongTerm);
  return (
    <div style={{ margin: "1rem 0" }} id="customizable-units">
      <h2 style={{ fontSize: "2em" }}>Columns:</h2>
      <WorkDay {...props} />
      {TermInputs("medium", mediumTerm)}
      {TermInputs("long", longTerm)}
    </div>
  );
};
