import { ItemList } from "../itemList/types";
import { SettingsState } from "../settings/types";
import { StorageKey } from "./types";

export const updateStorage = ({
  storageKey,
  val,
}: {
  storageKey: StorageKey;
  val: ItemList | SettingsState;
}) => {
  if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.sync.set({ [storageKey]: val });
  }
};
