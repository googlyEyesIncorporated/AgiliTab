import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectVisualSettings } from "./features/settings/settingsSlice";
import { SettingsWrapper } from "./components/settings/OpenSettings";
import { NowBox } from "./components/topRow/NowBox";
import { getStorage } from "./features/utils/storageHelpers";
import { BottomRow } from "./components/bottomRow";
import TimeHandler from "./components/TimeHandler";
import { undoDelete } from "./features/itemList/itemListSlice";

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
    <div className="App" style={{ backgroundColor: bgColor, color: fontColor }}>
      <TimeHandler>
        <NowBox />
        <BottomRow />
      </TimeHandler>
      <SettingsWrapper />
    </div>
  );
}

export default App;
