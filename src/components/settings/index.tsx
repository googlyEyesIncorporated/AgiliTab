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
      className={`p-2 overflow-auto xl:min-w-25vw text-xs leading-normal border border-current shadow-2xl${
        hideSettings ? " hidden" : ""
      }`}
      data-testid="hideable-settings"
      style={{ backgroundColor: bgColor }}
    >
      <span
        className={`popover z-10 h-fit absolute p-[5px] mx-0 mb-0 mt-[35px] left-0 right-0 top-0 bottom-0 border ${
          isInfoOpen ? "" : " hidden"
        }`}
        style={{
          borderColor: fontColor,
          backgroundColor: bgColor,
          color: fontColor,
        }}
      >
        <ul>
          <li className="grid" style={{ gridTemplateColumns: "1fr 4fr" }}>
            <div>
              <img src="/128.png" height={64} alt="logo" />
            </div>
            <div className="mt-2.5">
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
      <h1 className="font-bold text-2xl leading-none" id="settings-title">
        Customization
      </h1>
      <SetColors />
      <hr />
      <DateTimeFormat />
      <hr />
      <div className="my-4 mx-0">
        <h2 className="font-bold leading-none text-2xl">Time Frames</h2>
        <WorkDay
          isPopoverOpen={isPopoverOpen}
          setIsPopoverOpen={setIsPopoverOpen}
        />
        <hr />
        <TermInputs
          hideSettings={hideSettings}
          category="medium"
          termData={mediumTerm}
        />
        <hr />
        <TermInputs
          hideSettings={hideSettings}
          category="long"
          termData={longTerm}
        />
      </div>{" "}
      <div>
        <button
          onClick={() => setHidden(!hideSettings)}
          className="border border-current cursor-pointer pt-0.5 px-1"
          data-testid="hide-button"
        >
          ( Hide )
        </button>
        <Icon
          onClick={() => {
            setIsInfoOpen(!isInfoOpen);
          }}
          icon={faCircleInfo}
          faClassName="text-base my-0 mx-2.5"
          faStyle={{
            color: secondFontColor,
          }}
          iconClassName={`info-circle float-right`}
          data-testid="info-icon"
        />
      </div>
    </div>
  );
};
