import { useAppDispatch } from "../../../app/hooks";
import { resetVisualSetting } from "../../../features/settings/settingsSlice";

export const RestoreDefaults = () => {
  const dispatch = useAppDispatch();

  return (
    <div style={{ margin: "1rem 0" }}>
      <button
        id="restore-default-colors"
        className="cursor-pointer"
        onClick={() => dispatch(resetVisualSetting())}
      >
        Restore default colors
      </button>
    </div>
  );
};
