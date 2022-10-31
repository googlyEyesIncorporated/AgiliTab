import { ItemList, SettingsState, StorageKey } from "./types";

export const updateStorage = ({
  storageKey,
  val,
}: {
  storageKey: StorageKey;
  val: ItemList | SettingsState;
}) => {
  if (chrome.storage) {
    chrome.storage.sync.set({ [storageKey]: val });
  }
};
