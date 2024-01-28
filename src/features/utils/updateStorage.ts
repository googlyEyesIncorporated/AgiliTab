import { ItemList } from "../itemList/types";
import { LoadedSettingState } from "../settings/initialData";
import { StorageKey } from "./types";

export const updateStorage = ({
  storageKey,
  val,
}: {
  storageKey: StorageKey;
  val: ItemList | LoadedSettingState | string;
}) => {
  if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.sync.set({ [storageKey]: val });
  }
};
