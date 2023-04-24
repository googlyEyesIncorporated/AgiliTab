import { useEffect } from "react";
import { DraggableLists } from "./Components/BottomRow/DraggableLists";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectVisualSettings } from "./features/Settings/settingsSlice";
import { SettingsWrapper } from "./Components/Settings/OpenSettings";
import { DateTime } from "luxon";
import { NowBox } from "./Components/TopRow/NowBox/NowBox";
import { getStorage } from "./features/utils/storageHelpers";

function App() {
  const { bgColor, fontColor } = useAppSelector(selectVisualSettings);
  const dispatch = useAppDispatch();
  const today = DateTime.now().toISO();
  useEffect(() => {
    getStorage(dispatch);
  }, [dispatch]);

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = fontColor;
  }, [bgColor, fontColor]);

  return (
    <div className="App" style={{ backgroundColor: bgColor, color: fontColor }}>
      <NowBox />
      <DraggableLists today={today} />
      <SettingsWrapper />
    </div>
  );
}

export default App;
