import { useAppDispatch } from "../../../app/hooks";
import { populateSettingssFromChrome } from "../../settings/settingsSlice";
import { populateTasksFromChrome } from "../../itemList/itemListSlice";

export const getStorage = (dispatch: ReturnType<typeof useAppDispatch>) => {
  if (typeof chrome !== "undefined" && chrome.storage) {
    // chrome.storage.sync.clear();
    chrome.storage.sync.get(null, function (result) {
      const { settings, ...itemList } = result;
      dispatch(populateSettingssFromChrome(JSON.parse(settings)));
      dispatch(
        populateTasksFromChrome({
          itemList,
        })
      );
    });
  }
};
