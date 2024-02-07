import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectVisualSettings } from "./features/settings/settingsSlice";
import { SettingsWrapper } from "./components/settings/OpenSettings";
import { NowBox } from "./components/topRow/NowBox";
import { getStorage } from "./features/utils/storageHelpers";
import { BottomRow } from "./components/bottomRow";
import TimeProvider from "./components/TimeProvider";
import { undoDelete } from "./features/itemList/itemListSlice";
import Toaster from "./components/atoms/ToasterNotifications";

const ITEM_DELETED_NOTIFICATION = `Item's removed, press "Ctrl + z" to undo.`;

function App() {
  const { bgColor, fontColor } = useAppSelector(selectVisualSettings);

  const dispatch = useAppDispatch();
  useEffect(() => {
    getStorage(dispatch);
  }, [dispatch]);

  useEffect(() => {
    function CtrlZ(e: KeyboardEvent) {
      if (e.key === "z" && e.ctrlKey) dispatch(undoDelete());
    }

    document.addEventListener("keydown", CtrlZ);
    return () => {
      document.removeEventListener("keydown", CtrlZ);
    };
  }, [dispatch]);

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = fontColor;
  }, [bgColor, fontColor]);
  return (
    <div
      className="App"
      data-testid="App"
      style={{ backgroundColor: bgColor, color: fontColor }}
    >
      <TimeProvider specifiedPeriod={5000}>
        <NowBox />
        <BottomRow />
      </TimeProvider>
      <SettingsWrapper />
      <Toaster message={ITEM_DELETED_NOTIFICATION} />
    </div>
  );
}

export default App;
