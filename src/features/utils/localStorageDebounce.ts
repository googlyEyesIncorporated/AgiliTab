import { ItemListState } from "../itemList/types";
import { LoadedSettingState } from "../settings/initialData";
import { StorageKey } from "./types";
import { updateStorage } from "./updateStorage";

let storageUpdateTimeoutId: NodeJS.Timeout | null = null;

export const localStorageDebounce = (
  settings: LoadedSettingState | ItemListState,
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
