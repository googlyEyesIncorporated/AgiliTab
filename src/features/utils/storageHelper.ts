import { SettingsState } from "../Settings/types";
import { ItemList, ListKey } from "../itemList/types";

type StorageKey = ListKey | "settings";

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
