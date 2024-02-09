import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectTerm,
  selectVisualSettings,
  setPartialTerm,
} from "../../features/settings/settingsSlice";
import Icon from "../atoms/Icon";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { TermName } from "./term/TermName";
import { handleClickOutside } from "../../features/utils/handleClickOutside";
import { SetBooleanState } from "../../app/commonTypes";
import { defaultTerms } from "../../features/settings/initialData";
import { RadioButtons } from "../atoms/RadioButton";
import { UnitTypes } from "../../features/settings/types";
import { TimeFrameSelection } from "./TimeFrameselection";

export const ColumnSettings = ({
  settingsContainer,
  setHideSettings,
  groupId,
}: {
  settingsContainer: React.MutableRefObject<HTMLDivElement | null>;
  setHideSettings: SetBooleanState;
  groupId: number;
}) => {
  const dispatch = useAppDispatch();
  const termData = useAppSelector(selectTerm(groupId));
  const { bgColor } = useAppSelector(selectVisualSettings);
  const { secondFontColor } = useAppSelector(selectVisualSettings);

  const defaultTerm = defaultTerms[groupId];
  const onChange = (
    termPart: Parameters<typeof setPartialTerm>[0]["termPart"]
  ) => {
    dispatch(
      setPartialTerm({
        key: groupId,
        termPart,
      })
    );
  };

  useEffect(() => {
    const clickHandler = handleClickOutside(
      setHideSettings,
      settingsContainer,
      true
    );
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- first run only
  }, []);

  return (
    <div
      className={`p-2 overflow-auto xl:w-[25vw] text-xs leading-normal border border-current shadow-2xl`}
      data-testid="hideable-settings"
      style={{ backgroundColor: bgColor }}
    >
      <h1 className="text-l font-semibold" id="settings-title">
        TimeFrame:
        <div className="inline-block ml-2 font-normal">
          <RadioButtons
            groupId={groupId}
            firstRadioName="none"
            secondRadioName="duration"
            thirdRadioName="date"
            selected={termData.type}
            onChange={(e) => {
              onChange({ type: e.currentTarget.value as UnitTypes });
            }}
          />
        </div>
        <Icon
          onClick={() => {
            onChange(defaultTerm);
          }}
          data-testid={`group-${groupId}-restore-defaults`}
          icon={faArrowRightFromBracket}
          title="Restore Defaults"
          iconClassName="float-right mr-2"
          faStyle={{ color: secondFontColor }}
        />
      </h1>
      <hr style={{ borderColor: "inherit" }} />
      <div className="my-2 w-fit flex flex-wrap">
        <div className="mb-1 inline-block ml-2 min-w-[10.5rem]">
          <TermName
            groupId={groupId}
            title={termData.title}
            onChange={onChange}
          />
        </div>
        <TimeFrameSelection
          groupId={groupId}
          onChange={onChange}
          termData={termData}
        />
      </div>
    </div>
  );
};
