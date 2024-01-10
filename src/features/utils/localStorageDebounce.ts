import { ItemListState } from "../itemList/types";
import { SettingsState } from "../settings/types";
import { StorageKey } from "./types";
import { updateStorage } from "./updateStorage";

let storageUpdateTimeoutId: NodeJS.Timeout | null = null;

export const localStorageDebounce = (
  settings: SettingsState | ItemListState,
  storageKey: StorageKey
) => {
  if (storageUpdateTimeoutId) {
    clearTimeout(storageUpdateTimeoutId);
  }
  const stateString = JSON.stringify(settings);
  storageUpdateTimeoutId = setTimeout(() => {
    updateStorage({ storageKey, val: stateString });
  }, 1000);
};
