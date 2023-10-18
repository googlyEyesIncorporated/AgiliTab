import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectLongTerm,
  selectMediumTerm,
  selectVisualSettings,
} from "../../features/settings/settingsSlice";
import { SetColors } from "./visual/SetColors";
import { DateTimeFormat } from "./visual/DateTimeFormat";
import { WorkDay, SetBooleanState } from "./term/WorkDay";
import { TermInputs } from "./term/TermInputs";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import Icon from "../atoms/Icon";

const handleClickOutside =
  (
    setHidden: SetBooleanState,
    setIsPopoverOpen: SetBooleanState,
    setIsInfoOpen: SetBooleanState,
    { current }: React.MutableRefObject<HTMLDivElement | null>
  ) =>
  (event: Event) => {
    // @ts-ignore
    if (current && !current.contains(event.target)) {
      setHidden(true);
      setIsPopoverOpen(false);
      setIsInfoOpen(false);
    }
  };

const agilitabDotCom = "http://agilitab.com"; // NOSONAR

export const Settings = ({
  settingsContainer,
  hideSettings,
  setHidden,
}: {
  settingsContainer: React.MutableRefObject<HTMLDivElement | null>;
  hideSettings: boolean;
  setHidden: SetBooleanState;
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    document.addEventListener(
      "click",
      handleClickOutside(
        setHidden,
        setIsPopoverOpen,
        setIsInfoOpen,
        settingsContainer
      )
    );
    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside(
          setHidden,
          setIsPopoverOpen,
          setIsInfoOpen,
          settingsContainer
        )
      );
    };
    // run on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { fontColor, bgColor, secondFontColor } =
    useAppSelector(selectVisualSettings);
  const mediumTerm = useAppSelector(selectMediumTerm);
  const longTerm = useAppSelector(selectLongTerm);

  return (
    <div
      id="customize-selectors"
      className={hideSettings ? "hidden" : ""}
      style={{ backgroundColor: bgColor }}
    >
      <span
        className={`popover${isInfoOpen ? "" : " hidden"}`}
        style={{
          margin: 0,
          marginTop: 35,
          padding: 5,
          border: `1px solid ${fontColor}`,
          backgroundColor: bgColor,
          color: fontColor,
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 1,
          height: "fit-content",
        }}
      >
        <ul>
          <li style={{ display: "grid", gridTemplateColumns: "1fr 4fr" }}>
            <div>
              <img src="/128.png" height={64} alt="logo" />
            </div>
            <div style={{ marginTop: 10 }}>
              <ul>
                <li>
                  AgiliTab - <a href={agilitabDotCom}>agilitab.com</a>
                </li>
                <li>Developer: John Tirelli</li>
              </ul>
            </div>
          </li>
          <li>Special thanks:</li>
          <li>
            <a href="https://chrome.google.com/webstore/detail/prioritab/napbejkndjhcciibiglkimmgdlfjcbnp">
              - Prioritab
            </a>{" "}
            - The primary inspiration of the design of this extension.
          </li>
          <li>- Zeah D. - Design Consultant</li>
        </ul>
      </span>
      <h1 id="customize-corner-title">Customization</h1>
      <SetColors />
      <hr />
      <DateTimeFormat />
      <hr />
      <div style={{ margin: "1rem 0" }} id="customizable-units">
        <h2 style={{ fontSize: "2em" }}>Time Frames</h2>
        <WorkDay
          isPopoverOpen={isPopoverOpen}
          setIsPopoverOpen={setIsPopoverOpen}
        />
        <hr />
        <TermInputs category="medium" termData={mediumTerm} />
        <hr />
        <TermInputs category="long" termData={longTerm} />
      </div>{" "}
      <div>
        <button
          onClick={() => setHidden(!hideSettings)}
          className="cursor-pointer pt-5 pb-3 px-3 button-height"
        >
          ( Hide )
        </button>
        <Icon
          onClick={() => {
            setIsInfoOpen(!isInfoOpen);
          }}
          icon={faCircleInfo}
          faStyle={{
            color: secondFontColor,
            fontSize: "1rem",
            margin: "0 10px",
          }}
          iconClassName={`info-circle pull-right`}
        />
      </div>
    </div>
  );
};
