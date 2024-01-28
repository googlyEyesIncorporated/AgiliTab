import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectTerm,
  selectVisualSettings,
} from "../../features/settings/settingsSlice";
import { OnSaveProps, saveTerm } from "../../features/settings/utils";
import { DateTime } from "luxon";
import Icon from "../atoms/Icon";
import { UnitType } from "../../features/settings/types";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { TermName } from "./term/TermName";
import RadioButton from "../atoms/RadioButton";
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

  const { bgColor } = useAppSelector(selectVisualSettings);
  const termData = useAppSelector(selectTerm(groupId));

  const { secondFontColor } = useAppSelector(selectVisualSettings);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [unitType, setUnitType] = useState("");
  const [isDuration, setIsDuration] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState(termData.duration);

  const defaultTerm = defaultTerms[groupId];

  useEffect(() => {
    setUnitType(termData.title.toLowerCase());
    setTitle(termData.title);
    setStartDate(termData.startDate ?? "");
    setEndDate(
      termData?.endDate ??
        DateTime.fromISO(termData.startDate ?? "")
          .plus({ [termData.duration.unit]: termData.duration.qty })
          .toFormat(DATE_TIME_NO_SECONDS) ??
        ""
    );
  }, [termData]);

  // const checkboxId = `${category}_repeat-duration`;

  const onChange = (changed: Partial<OnSaveProps>) => {
    if (duration.qty) {
      saveTerm({
        enabled: true,
        isDuration,
        duration,
        startDate,
        dispatch,
        groupId,
        unitType,
        title,
        endDate,
        ...changed,
      });
    }
  };

  return (
    <div
      className={`p-2 overflow-auto xl:w-[25vw] text-xs leading-normal border border-current shadow-2xl`}
      data-testid="hideable-settings"
      style={{ backgroundColor: bgColor }}
    >
      <h1 className="text-xl" id="settings-title">
        <div className="inline-block ml-2">
          <RadioButton
            enabled={true}
            groupId={groupId}
            firstRadioName="duration"
            secondRadioName="date"
            firstIsChecked={isDuration}
            setIsChecked={setIsDuration}
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
            setUnitType(unitType);
            setTitle(title);
            if (defaultTerm.isDuration && "duration" in defaultTerm) {
              const duration = defaultTerm.duration;
              setDuration(duration);
            }
            onChange({ startDate, endDate, unitType, title, duration });
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
            title={title}
            enabled={true}
            setTitle={setTitle}
            setUnitType={setUnitType}
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
          {!isDuration && (
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
          {isDuration && (
            <Duration
              duration={duration}
              groupId={groupId}
              enabled={true}
              setDuration={setDuration}
              onChange={onChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};
