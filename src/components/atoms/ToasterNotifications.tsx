import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectShouldShowToaster,
  toggleShouldShowToaster,
} from "../../features/itemList/itemListSlice";
import { selectVisualSettings } from "../../features/settings/settingsSlice";

const Notification = ({ message }: { message: string }) => {
  const { bgColor, fontColor } = useAppSelector(selectVisualSettings);

  return (
    <div
      style={{ backgroundColor: fontColor, color: bgColor }}
      className="fade-out fixed left-1/2 bg-[#00000080] p-2.5 rounded-[5px] z-50  translate-x-[-50%] text-white toaster"
    >
      {message}
    </div>
  );
};

const Toaster = ({ message }: { message: string }) => {
  const timer = React.useRef<NodeJS.Timeout | null>(null);
  const shouldShowToaster = useAppSelector(selectShouldShowToaster);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (shouldShowToaster) {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        dispatch(toggleShouldShowToaster(false));
      }, 4000);
    }
  }, [shouldShowToaster, dispatch]);

  return shouldShowToaster ? <Notification message={message} /> : null;
};

export default Toaster;
