import { useAppDispatch } from "../../../app/hooks";
import { populateSettingssFromChrome } from "../../settings/settingsSlice";
import {
  populateTaskOrderFromChrome,
  populateTasksFromChrome,
} from "../../itemList/itemListSlice";

export const getStorage = (dispatch: ReturnType<typeof useAppDispatch>) => {
  if (typeof chrome !== "undefined" && chrome.storage) {
    // chrome.storage.sync.clear();
    chrome.storage.sync.get(null, function (result) {
      const { settings, listOrder = [], ...itemList } = result;
      settings && dispatch(populateSettingssFromChrome(JSON.parse(settings)));
      Object.keys(itemList).length &&
        dispatch(populateTasksFromChrome({ itemList }));
      listOrder.length && dispatch(populateTaskOrderFromChrome({ listOrder }));
    });
  }
};
