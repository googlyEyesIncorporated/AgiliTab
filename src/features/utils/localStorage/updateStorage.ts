import { ListTypes } from "../../itemList/types";
import { SettingsState } from "../../settings/types";

export const updateStorage = ({
  storageKey,
  val,
}: {
  storageKey: string;
  val: ListTypes | string;
}) => {
  if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.sync.set({ [storageKey]: val });
  }
};
