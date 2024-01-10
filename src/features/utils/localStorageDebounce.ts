import { SettingsState } from "../settings/types";
import { updateStorage } from "./updateStorage";

let settingUpdateTimeoutId: NodeJS.Timeout | null = null;

export const localStorageDebounce = (settings: SettingsState) => {
  if (settingUpdateTimeoutId) {
    clearTimeout(settingUpdateTimeoutId);
  }
  const settingsString = JSON.stringify(settings);
  settingUpdateTimeoutId = setTimeout(() => {
    updateStorage({ storageKey: "settings", val: settingsString });
  }, 1000);
};
