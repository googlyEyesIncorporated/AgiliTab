import { useEffect } from "react";
import { TopRow } from "./Components/TopRow";
import { BottomRow } from "./Components/BottomRow";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  populateSettingssFromChrome,
  selectVisualSettings,
  SettingsState,
} from "./features/general/settingsSlice";
import {
  ItemList,
  populateTasksFromChrome,
} from "./features/general/itemListSlice";
import { SettingsWrapper } from "./Components/SettingsWrapper";

function App() {
  const { bgColor, fontColor } = useAppSelector(selectVisualSettings);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (chrome.storage) {
      chrome.storage.sync.get(
        ["shortTermList", "mediumTermList", "longTermList"],
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
          dispatch(
            populateTasksFromChrome({
              shortTermList,
              mediumTermList,
              longTermList,
            })
          );
        }
      );
      chrome.storage.sync.get(["settings"], (result) => {
        const settings = result["settings"]
          ? (result["settings"] as SettingsState)
          : {};
        dispatch(populateSettingssFromChrome(settings));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = fontColor;
  }, [bgColor, fontColor]);

  return (
    <div className="App" style={{ backgroundColor: bgColor, color: fontColor }}>
      <TopRow h24={false} />
      <BottomRow />
      <SettingsWrapper />
    </div>
  );
}

export default App;
