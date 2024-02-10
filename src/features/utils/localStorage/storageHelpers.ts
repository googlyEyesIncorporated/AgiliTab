import { useAppDispatch } from "../../../app/hooks";
import { populateSettingssFromChrome } from "../../settings/settingsSlice";
import { ItemList } from "../../itemList/types";
import { populateTasksFromChrome } from "../../itemList/itemListSlice";

export const getStorage = (dispatch: ReturnType<typeof useAppDispatch>) => {
  if (typeof chrome !== "undefined" && chrome.storage) {
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
          ? (result["settings"] as string)
          : "{}";
        dispatch(populateSettingssFromChrome(JSON.parse(settings)));
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
};
