import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateFormat, KeyValuePair, SettingsState, TimeFormat } from "./types";
import { updateStorage } from "../utils/localStorage/updateStorage";
import { RootState } from "../../app/commonTypes";
import { localStorageDebounce } from "../utils/localStorage/localStorageDebounce";
import { initalVisuals, initialSettings } from "./initialData";
import { DATE_TIME_NO_SECONDS } from "../../commonUtils";
import { DateTime } from "luxon";

export const unitsSlice = createSlice({
  name: "units",
  initialState: initialSettings,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    populateSettingssFromChrome: (
      state,
      { payload }: PayloadAction<SettingsState>
    ) => {
      state.visualSettings = payload.visualSettings;
    },
    setVisualSetting: (
      state,
      { payload: { key, value } }: PayloadAction<KeyValuePair>
    ) => {
      state.visualSettings[key] = value;
      localStorageDebounce(state, "settings");
    },
    setDateTimeFormats: (
      state,
      { payload }: PayloadAction<DateFormat & TimeFormat>
    ) => {
      state.visualSettings = { ...state.visualSettings, ...payload };
      updateStorage({ storageKey: "settings", val: JSON.stringify(state) });
    },
    resetVisualSetting: (state) => {
      state.visualSettings = initalVisuals;
      updateStorage({ storageKey: "settings", val: JSON.stringify(state) });
    },
  },
});

export const {
  populateSettingssFromChrome,
  setVisualSetting,
  setDateTimeFormats,
  resetVisualSetting,
} = unitsSlice.actions;

export const selectTimeFormat = (state: RootState) =>
  state.settings.visualSettings.timeFormat;
export const selectDateFormat = (state: RootState) =>
  state.settings.visualSettings.dateFormat;
export const selectVisualSettings = (state: RootState) =>
  state.settings.visualSettings;

export default unitsSlice.reducer;
