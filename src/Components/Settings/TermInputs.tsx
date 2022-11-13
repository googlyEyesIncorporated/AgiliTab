import { useEffect, useState } from "react";
import {
  defaultLongTerm,
  defaultMediumTerm,
  selectVisualSettings,
} from "../../features/Settings/settingsSlice";
import { Duration } from "./Duration";
import { SelectDate } from "./SelectDate";
import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import RadioButton from "./RadioButton";
import { DateTime } from "luxon";
import { UnitType } from "../../features/Settings/types";
import { TermName } from "./TermName";
import CheckBox from "./CheckBox";
import { Totitlecase } from "../../features/utils/titleCase";
import { Categories, onRepeat, saveTerm } from "../../features/Settings/utils";

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
  const { secondFontColor } = useAppSelector(selectVisualSettings);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [unitType, setUnitType] = useState("");
  const [isDuration, setIsDuration] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState(termData.duration);
  const [repeat, setRepeat] = useState(true);
  const termString = `${category}Term` as keyof typeof defaultTerms;

  useEffect(() => {
    setUnitType(termData.title.toLowerCase());
    setTitle(termData.title);
    setStartDate(termData.startDate);
    setEndDate(
      termData?.endDate ||
        DateTime.fromISO(termData.startDate)
          .plus({ [termData.duration.unit]: termData.duration.qty })
          .toISO()
    );
    setRepeat(termData.repeat);
  }, [termData]);

  return (
    <div style={{ margin: "0.5rem 0" }}>
      <h2>
        {`${Totitlecase(category)}-term: `}
        <FontAwesomeIcon
          onClick={() => setEnabled(!enabled)}
          id="customize-button"
          icon={enabled ? faUnlock : faLock}
          title="Edit"
          style={{
            color: secondFontColor,
            fontSize: "1rem",
            float: "right",
            margin: "0 10px",
          }}
        />
        <FontAwesomeIcon
          onClick={() => {
            setStartDate(defaultTerms[termString].startDate);
            setEndDate(defaultTerms[termString].endDate || "");
            setUnitType(defaultTerms[termString].unitType);
            setTitle(defaultTerms[termString].title);
            setRepeat(defaultTerms[termString].repeat);
          }}
          id="restore-defaults"
          icon={faArrowRightFromBracket}
          title="Restore Defaults"
          style={{ color: secondFontColor, fontSize: "1rem", float: "right" }}
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
            isDuration={isDuration}
            setIsDuration={setIsDuration}
          />
          &nbsp; &nbsp;
          <CheckBox
            nameId="repeat-duration"
            checked={termData.repeat ? true : false}
            onChange={onRepeat(dispatch, category)}
            disabled={enabled && isDuration ? false : true}
            inputStyle={{
              visibility: "visible",
              margin: "0px 0.3rem",
              float: "right",
            }}
            labelStyle={{ float: "right" }}
            labelText="Repeat?"
          />
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
        id="date-time-format-save"
        disabled={enabled ? false : true}
        onClick={() =>
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
          })
        }
      >
        Save
      </button>
    </div>
  );
};
