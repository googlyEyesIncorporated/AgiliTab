import { store } from "../../app/store";
import { updateStorage } from "./updateStorage";

let settingUpdateTimeoutId: NodeJS.Timeout | null = null;

export const localStorageDebounce = () => {
  if (settingUpdateTimeoutId) {
    clearTimeout(settingUpdateTimeoutId);
  }
  settingUpdateTimeoutId = setTimeout(() => {
    const state = store.getState().settings;
    updateStorage({ storageKey: "settings", val: state });
  }, 1000);
};
