import { useEffect, useState } from "react";
import {
  defaultLongTerm,
  defaultMediumTerm,
  selectVisualSettings,
} from "../../../features/settings/settingsSlice";
import { Duration } from "./Duration";
import { SelectDate } from "./SelectDate";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import RadioButton from "../../atoms/RadioButton";
import { DateTime } from "luxon";
import { UnitType } from "../../../features/settings/types";
import { TermName } from "./TermName";
import { saveTerm } from "../../../features/settings/utils";
import Icon from "../../atoms/Icon";

const defaultTerms: Record<number, UnitType> = {
  1: defaultMediumTerm,
  2: defaultLongTerm,
};

export const TermInputsEvolved = ({
  termData,
  groupId,
}: {
  termData: UnitType;
  groupId: number;
}) => {
  const { fontColor, secondFontColor } = useAppSelector(selectVisualSettings);
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

  const buttonColor = fontColor;
  // const checkboxId = `${category}_repeat-duration`;

  return (
    <div className="my-2 mx-0">
      <h2 className="font-bold text-lg">
        <Icon
          onClick={() => {
            setStartDate(defaultTerms[groupId].startDate ?? "");
            setEndDate(defaultTerms[groupId].endDate ?? "");
            setUnitType(defaultTerms[groupId].unitType);
            setTitle(defaultTerms[groupId].title);
            setRepeat(defaultTerms[groupId].repeat);
            setDuration(defaultTerms[groupId].duration);
          }}
          data-testid={`${groupId}-restore-defaults`}
          icon={faArrowRightFromBracket}
          title="Restore Defaults"
          faClassName="text-base float-right"
          faStyle={{ color: secondFontColor }}
        />
      </h2>
      <div className="my-2 mx-0">
        <TermName
          groupId={groupId}
          title={title}
          enabled={true}
          setTitle={setTitle}
          setUnitType={setUnitType}
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
        enabled={true}
        date={startDate}
        limit={{ max: endDate }}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      {!isDuration && (
        <SelectDate
          title="End"
          groupId={groupId}
          enabled={true}
          date={endDate}
          limit={{ min: startDate }}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      )}
      {isDuration && (
        <Duration
          duration={duration}
          groupId={groupId}
          enabled={true}
          setDuration={setDuration}
        />
      )}
      <button
        className="border border-current pt-0.5 px-1"
        style={{ color: buttonColor, borderColor: buttonColor }}
        onClick={() => {
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
            });
          }
        }}
      >
        Save
      </button>
    </div>
  );
};
