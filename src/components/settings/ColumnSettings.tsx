import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectTerm,
  selectVisualSettings,
} from "../../features/settings/settingsSlice";
import { OnSaveProps, saveTerm2 } from "../../features/settings/utils";
import { DateTime } from "luxon";
import Icon from "../atoms/Icon";
import { UnitType } from "../../features/settings/types";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { TermName } from "./term/TermName";
import { SelectDate } from "./term/SelectDate";
import { Duration } from "./term/Duration";
import { handleClickOutside } from "../../features/utils/handleClickOutside";
import { DATE_TIME_NO_SECONDS } from "../../commonUtils";
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

  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const defaultTerm = defaultTerms[groupId];
  const onChange = (changed: Partial<OnSaveProps>) => {
    if (termData.duration?.qty) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run on mount only
  }, []);

  useEffect(() => {
    setStartDate(termData.startDate ?? "");
    if (termData.endDate) {
      setEndDate(termData.endDate);
    } else if (termData.duration) {
      setEndDate(
        DateTime.fromISO(termData.startDate ?? "")
          .plus({ [termData.duration.unit]: termData.duration.qty })
          .toFormat(DATE_TIME_NO_SECONDS) ?? ""
      );
    }
  }, [termData]);

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
            setStartDate(startDate);
            setEndDate(endDate);
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
            date={startDate}
            limit={{ max: endDate }}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            onChange={onChange}
          />
        </div>
        <div className="inline-block mb-1 inline-block min-w-[10.5rem] ml-2">
          {!termData.isDuration && (
            <SelectDate
              title="End"
              groupId={groupId}
              date={endDate}
              limit={{ min: startDate }}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
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
