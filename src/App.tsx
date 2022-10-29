import { useEffect } from "react";
import { TopRow } from "./Components/TopRow";
import { BottomRow } from "./Components/BottomRow";
import { useAppDispatch } from "./app/hooks";
import { ItemList, SettingsState } from "./types";
import {
  populateSettingssFromChrome,
  selectVisualSettings,
} from "./features/counter/settingsSlice";
import { populateTasksFromChrome } from "./features/counter/itemListSlice";
import { useSelector } from "react-redux";

function App() {
  const { bgColor, textColor } = useSelector(selectVisualSettings);
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
              shortTermList: {
                listKey: "shortTermList",
                itemList: shortTermList,
                save: false,
              },
              mediumTermList: {
                listKey: "mediumTermList",
                itemList: mediumTermList,
                save: false,
              },
              longTermList: {
                listKey: "longTermList",
                itemList: longTermList,
                save: false,
              },
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

  return (
    <div className="App" style={{ backgroundColor: bgColor, color: textColor }}>
      <TopRow h24={false} />
      <BottomRow />
    </div>
  );
}

export default App;
