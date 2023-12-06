import { useEffect, useState } from "react";
import {
  defaultLongTerm,
  defaultMediumTerm,
  selectVisualSettings,
} from "../../../features/settings/settingsSlice";
import { Duration } from "./Duration";
import { SelectDate } from "./SelectDate";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import RadioButton from "../../atoms/RadioButton";
import { DateTime } from "luxon";
import { UnitType } from "../../../features/settings/types";
import { TermName } from "./TermName";
import CheckBox from "../../atoms/CheckBox";
import { Sentencecase } from "../../../features/utils/Sentencecase";
import {
  Categories,
  onRepeat,
  saveTerm,
} from "../../../features/settings/utils";
import Icon from "../../atoms/Icon";

const defaultTerms: { mediumTerm: UnitType; longTerm: UnitType } = {
  mediumTerm: defaultMediumTerm,
  longTerm: defaultLongTerm,
};

export const TermInputs = ({
  category,
  termData,
}: {
  category: Categories;
  termData: UnitType;
}) => {
  const { fontColor, secondFontColor } = useAppSelector(selectVisualSettings);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [unitType, setUnitType] = useState("");
  const [isDuration, setIsDuration] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState(termData.duration);
  const [repeat, setRepeat] = useState(true);
  const termString = `${category}Term` as keyof typeof defaultTerms; // NOSONAR

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

  const buttonColor = enabled ? fontColor : "#b7b7b7";
  return (
    <div style={{ margin: "0.5rem 0" }}>
      <h2>
        {`${Sentencecase(category)}-term: `}
        <Icon
          onClick={() => setEnabled(!enabled)}
          faClassName="fade-in-1s text-double cursor-pointer"
          icon={enabled ? faUnlock : faLock}
          title="Edit"
          faStyle={{
            color: secondFontColor,
            fontSize: "1rem",
            float: "right",
            margin: "0 10px",
          }}
        />
        <Icon
          onClick={() => {
            setStartDate(defaultTerms[termString].startDate ?? "");
            setEndDate(defaultTerms[termString].endDate ?? "");
            setUnitType(defaultTerms[termString].unitType);
            setTitle(defaultTerms[termString].title);
            setRepeat(defaultTerms[termString].repeat);
            setDuration(defaultTerms[termString].duration);
          }}
          icon={faArrowRightFromBracket}
          title="Restore Defaults"
          faStyle={{ color: secondFontColor, fontSize: "1rem", float: "right" }}
        />
      </h2>
      <div style={{ margin: "0.5rem 0" }}>
        <TermName
          category={category}
          title={title}
          enabled={enabled}
          setTitle={setTitle}
          setUnitType={setUnitType}
        />
        <div style={{ display: "inline-block", width: "50%" }}>
          <RadioButton
            enabled={enabled}
            category={category}
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
        category={category}
        enabled={enabled}
        date={startDate}
        limit={{ max: endDate }}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      {!isDuration && (
        <SelectDate
          title="End"
          category={category}
          enabled={enabled}
          date={endDate}
          limit={{ min: startDate }}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      )}
      {isDuration && (
        <Duration
          duration={duration}
          category={category}
          enabled={enabled}
          setDuration={setDuration}
        />
      )}
      <button
        className="border border-current pt-0.5 px-1"
        style={{ color: buttonColor, borderColor: buttonColor }}
        disabled={!enabled}
        onClick={() => {
          if (duration.qty) {
            saveTerm({
              enabled,
              isDuration,
              duration,
              startDate,
              dispatch,
              category,
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
