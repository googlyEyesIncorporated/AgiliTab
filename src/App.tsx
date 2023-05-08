import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectVisualSettings } from "./features/settings/settingsSlice";
import { SettingsWrapper } from "./components/Settings/OpenSettings";
import { NowBox } from "./components/TopRow/NowBox";
import { getStorage } from "./features/utils/storageHelpers";
import { BottomRow } from "./components/BottomRow";
import TimeHandler from "./components/TimeHandler";

function App() {
  const { bgColor, fontColor } = useAppSelector(selectVisualSettings);

  const dispatch = useAppDispatch();
  useEffect(() => {
    getStorage(dispatch);
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
