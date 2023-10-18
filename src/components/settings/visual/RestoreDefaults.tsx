import { useAppDispatch } from "../../../app/hooks";
import { resetVisualSetting } from "../../../features/settings/settingsSlice";

export const RestoreDefaults = () => {
  const dispatch = useAppDispatch();

  return (
    <span>
      <button
        id="restore-default-colors"
        className="cursor-pointer px-3 pt-3 pb-3 button-height"
        onClick={() => dispatch(resetVisualSetting())}
      >
        Restore default colors
      </button>
    </span>
  );
};
