import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  defaultLongTerm,
  defaultMediumTerm,
  selectTerm,
  selectVisualSettings,
} from "../../features/settings/settingsSlice";
import { SetBooleanState } from "./term/WorkDay";
import { OnSaveProps, saveTerm } from "../../features/settings/utils";
import { DateTime } from "luxon";
import Icon from "../atoms/Icon";
import { UnitType } from "../../features/settings/types";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { TermName } from "./term/TermName";
import RadioButton from "../atoms/RadioButton";
import { SelectDate } from "./term/SelectDate";
import { Duration } from "./term/Duration";

const defaultTerms: Record<number, UnitType> = {
  1: defaultMediumTerm,
  2: defaultLongTerm,
};

const handleClickOutside =
  (
    setHideSettings: SetBooleanState,
    { current: currentSettings }: React.MutableRefObject<HTMLDivElement | null>
  ) =>
  (event: Event) => {
    if (currentSettings && !currentSettings.contains(event.target as Node)) {
      setHideSettings(true);
    }
  };

export const ColumnSettings = ({
  settingsContainer,
  hideSettings,
  setHideSettings,
  groupId,
}: {
  settingsContainer: React.MutableRefObject<HTMLDivElement | null>;
  hideSettings: boolean;
  setHideSettings: SetBooleanState;
  groupId: number;
}) => {
  useEffect(() => {
    const clickHandler = handleClickOutside(setHideSettings, settingsContainer);
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
  const [repeat, setRepeat] = useState(true);

  useEffect(() => {
    setUnitType(termData.title.toLowerCase());
    setTitle(termData.title);
    setStartDate(termData.startDate ?? "");
    setEndDate(
      termData?.endDate ??
        DateTime.fromISO(termData.startDate ?? "")
          .plus({ [termData.duration.unit]: termData.duration.qty })
          .toISO() ??
        ""
    );
    setRepeat(termData.repeat);
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
        repeat,
        endDate,
        ...changed,
      });
    }
  };

  return (
    <div
      className={`p-2 overflow-auto xl:min-w-25vw text-xs leading-normal border border-current shadow-2xl${
        hideSettings ? " hidden" : ""
      }`}
      data-testid="hideable-settings"
      style={{ backgroundColor: bgColor }}
    >
      <h1 className="font-bold text-2xl leading-none" id="settings-title">
        List Customization
        <Icon
          onClick={() => {
            const startDate = defaultTerms[groupId].startDate ?? "";
            const endDate = defaultTerms[groupId].endDate ?? "";
            const unitType = defaultTerms[groupId].unitType;
            const title = defaultTerms[groupId].title;
            const repeat = defaultTerms[groupId].repeat;
            const duration = defaultTerms[groupId].duration;
            setStartDate(startDate);
            setEndDate(endDate);
            setUnitType(unitType);
            setTitle(title);
            setRepeat(repeat);
            setDuration(duration);
            onChange({ startDate, endDate, unitType, title, repeat, duration });
          }}
          data-testid={`${groupId}-restore-defaults`}
          icon={faArrowRightFromBracket}
          title="Restore Defaults"
          faClassName="text-base float-right"
          faStyle={{ color: secondFontColor }}
        />
      </h1>
      <hr style={{ borderColor: "inherit" }} />
      <div className="my-4 mx-0">
        <div className="my-2 mx-0">
          <div className="my-2 mx-0">
            <TermName
              groupId={groupId}
              title={title}
              enabled={true}
              setTitle={setTitle}
              setUnitType={setUnitType}
              onChange={onChange}
            />
            <div className="inline-block w-1/2">
              <RadioButton
                enabled={true}
                groupId={groupId}
                firstRadioName="duration"
                secondRadioName="date"
                firstIsChecked={isDuration}
                setIsChecked={setIsDuration}
              />
              {/* Temporarily disabled
          &nbsp; &nbsp;
          <CheckBox
            nameId={checkboxId}
            checked={termData.repeat}
            onChange={onRepeat(dispatch, category)}
            disabled={!(enabled && isDuration)}
            inputStyle={{
              visibility: "visible",
              margin: "0px 0.3rem",
              float: "right",
            }}
            labelClass="float-right bottom-[-2px] align-checkbox-label align-middle relative"
            labelText="Repeat?"
            labelOnRight
          /> */}
            </div>
          </div>
          <SelectDate
            title="Beginning"
            groupId={groupId}
            date={startDate}
            limit={{ max: endDate }}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            onChange={onChange}
          />
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
