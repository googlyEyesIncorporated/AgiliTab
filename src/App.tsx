import { useEffect } from "react";
import { DraggableLists } from "./Components/BottomRow/DraggableLists";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  populateSettingssFromChrome,
  selectVisualSettings,
} from "./features/Settings/settingsSlice";
import { populateTasksFromChrome } from "./features/itemList/itemListSlice";
import { SettingsWrapper } from "./Components/Settings/OpenSettings";
import { ItemList } from "./features/itemList/types";
import { SettingsState } from "./features/Settings/types";
import { DateTime } from "luxon";
import { NowBox } from "./Components/TopRow/NowBox/NowBox";
import { TimeLeft } from "./Components/TopRow/TimeLeftBox/TimeLeft";
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
      <div id="top-row">
        <NowBox />
        <TimeLeft today={today} />
      </div>
      <DraggableLists />
      <SettingsWrapper />
    </div>
  );
}

export default App;
