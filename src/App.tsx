import { useEffect } from "react";
import { TopRow } from "./Components/TopRow";
import { BottomRow } from "./Components/BottomRow";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  populateSettingssFromChrome,
  selectVisualSettings,
} from "./features/Settings/settingsSlice";
import { populateTasksFromChrome } from "./features/itemList/itemListSlice";
import { SettingsWrapper } from "./Components/SettingsWrapper";
import { ItemList } from "./features/itemList/types";
import { SettingsState } from "./features/Settings/types";

function App() {
  const { bgColor, fontColor } = useAppSelector(selectVisualSettings);
  const dispatch = useAppDispatch();
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
      <TopRow />
      <BottomRow />
      <SettingsWrapper />
    </div>
  );
}

export default App;
