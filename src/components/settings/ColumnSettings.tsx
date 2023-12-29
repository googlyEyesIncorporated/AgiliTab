import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectTerm,
  selectVisualSettings,
} from "../../features/settings/settingsSlice";
import { SetBooleanState } from "./term/WorkDay";
import { TermInputsEvolved } from "./term/TermInputsEvolved";

const handleClickOutside =
  (
    setHideSettings: SetBooleanState,
    { current: currentSettings }: React.MutableRefObject<HTMLDivElement | null>,
    { current: currentIcon }: React.MutableRefObject<HTMLElement | null>
  ) =>
  (event: Event) => {
    if (currentSettings && !currentSettings.contains(event.target as Node)) {
      if (currentIcon && !currentIcon.contains(event.target as Node)) {
        setHideSettings(true);
      }
    }
  };

export const ColumnSettings = ({
  settingsContainer,
  settingsIcon,
  hideSettings,
  setHideSettings,
  groupId,
}: {
  settingsContainer: React.MutableRefObject<HTMLDivElement | null>;
  settingsIcon: React.MutableRefObject<HTMLElement | null>;
  hideSettings: boolean;
  setHideSettings: SetBooleanState;
  groupId: number;
}) => {
  useEffect(() => {
    const clickHandler = handleClickOutside(
      setHideSettings,
      settingsContainer,
      settingsIcon
    );
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run on mount only
  }, []);

  const { bgColor } = useAppSelector(selectVisualSettings);
  const thisTerm = useAppSelector(selectTerm(groupId));

  return (
    <div
      className={`p-2 overflow-auto xl:min-w-25vw text-xs leading-normal border border-current shadow-2xl${
        hideSettings ? " hidden" : ""
      }`}
      data-testid="hideable-settings"
      style={{ backgroundColor: bgColor }}
    >
      <h1 className="font-bold text-2xl leading-none" id="settings-title">
        Customization
      </h1>
      <hr />
      <div className="my-4 mx-0">
        <TermInputsEvolved groupId={groupId} termData={thisTerm} />
      </div>{" "}
      <div>
        <button
          onClick={() => setHideSettings(true)}
          className="border border-current cursor-pointer pt-0.5 px-1"
          data-testid="hide-button"
        >
          ( Hide )
        </button>
      </div>
    </div>
  );
};
