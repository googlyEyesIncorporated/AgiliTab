import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectTerm,
  selectVisualSettings,
} from "../../features/settings/settingsSlice";
import { OnSaveProps, saveTerm2 } from "../../features/settings/utils";
import Icon from "../atoms/Icon";
import { UnitType, UnitTypeWithDuration } from "../../features/settings/types";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { TermName } from "./term/TermName";
import { SelectDate } from "./term/SelectDate";
import { Duration } from "./term/Duration";
import { handleClickOutside } from "../../features/utils/handleClickOutside";
import { SetBooleanState } from "../../app/commonTypes";
import {
  defaultLongTerm,
  defaultMediumTerm,
  defaultShortTerm,
} from "../../features/settings/initialData";
import { RadioButtons } from "../atoms/RadioButton";

const defaultTerms: Record<number, UnitType | UnitType<false>> = {
  0: defaultShortTerm,
  1: defaultMediumTerm,
  2: defaultLongTerm,
};

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
  const onChange = (changed: Partial<OnSaveProps>) => {
    if ((termData as UnitTypeWithDuration<true>).duration?.qty) {
      saveTerm2({ enabled: true, groupId, dispatch, termPart: changed });
    }
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
  }, []);

  // const checkboxId = `${category}_repeat-duration`;

  return (
    <div
      className={`p-2 overflow-auto xl:w-[25vw] text-xs leading-normal border border-current shadow-2xl`}
      data-testid="hideable-settings"
      style={{ backgroundColor: bgColor }}
    >
      <h1 className="text-xl" id="settings-title">
        <div className="inline-block ml-2">
          <RadioButtons
            enabled={true}
            groupId={groupId}
            firstRadioName="duration"
            secondRadioName="date"
            firstIsChecked={termData.isDuration}
            onChange={(e) => {
              onChange({ isDuration: e.currentTarget.value === "duration" });
            }}
          />
        </div>
        <Icon
          onClick={() => {
            const startDate = defaultTerm.startDate ?? "";
            const endDate = defaultTerm.endDate ?? "";
            const unitType = defaultTerm.unitType;
            const title = defaultTerm.title;
            if (defaultTerm.isDuration && "duration" in defaultTerm) {
              const duration = defaultTerm.duration;
              onChange({ startDate, endDate, unitType, title, duration });
            } else {
              onChange({ startDate, endDate, unitType, title });
            }
          }}
          data-testid={`group-${groupId}-restore-defaults`}
          icon={faArrowRightFromBracket}
          title="Restore Defaults"
          iconClassName="float-right mr-2"
          faStyle={{ color: secondFontColor }}
        />
      </h1>
      <hr style={{ borderColor: "inherit" }} />
      <div className="my-2 w-fit flex flex-wrap mx-auto">
        <div className="mb-1 inline-block ml-2 min-w-[10.5rem]">
          <TermName
            groupId={groupId}
            title={termData.title}
            enabled={true}
            onChange={onChange}
          />
        </div>
        <div className="inline-block mb-1 inline-block min-w-[10.5rem] ml-2">
          <SelectDate
            title="Beginning"
            groupId={groupId}
            date={termData.startDate}
            limit={{ max: termData.endDate }}
            onChange={onChange}
          />
        </div>
        <div className="inline-block mb-1 inline-block min-w-[10.5rem] ml-2">
          {!termData.isDuration && (
            <SelectDate
              title="End"
              groupId={groupId}
              date={termData.endDate}
              limit={{ min: termData.startDate }}
              onChange={onChange}
            />
          )}
          {termData.isDuration && termData.duration && (
            <Duration
              duration={termData.duration}
              groupId={groupId}
              enabled={true}
              onChange={onChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};
