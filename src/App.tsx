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

function App() {
  const { bgColor, fontColor } = useAppSelector(selectVisualSettings);
  const dispatch = useAppDispatch();
  const today = DateTime.now().toISO();
  useEffect(() => {
    if (chrome.storage) {
      // chrome.storage.sync.clear();
      chrome.storage.sync.get(
        ["shortTermList", "mediumTermList", "longTermList", "settings"],
        function (result) {
          const shortTermList = result["shortTermList"]
            ? (Object.values(result["shortTermList"]) as ItemList)
            : [];
          const mediumTermList = result["mediumTermList"]
            ? (Object.values(result["mediumTermList"]) as ItemList)
            : [];
          const longTermList = result["longTermList"]
            ? (Object.values(result["longTermList"]) as ItemList)
            : [];
          const settings = result["settings"]
            ? (result["settings"] as SettingsState)
            : {};
          dispatch(populateSettingssFromChrome(settings));
          dispatch(
            populateTasksFromChrome({
              shortTermList,
              mediumTermList,
              longTermList,
            })
          );
        }
      );
    }
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
