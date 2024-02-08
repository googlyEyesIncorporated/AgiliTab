import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import { DateFormat, KeyValuePair, TimeFormat, UnitType } from "./types";
import { updateStorage } from "../utils/updateStorage";
import { RootState } from "../../app/commonTypes";
import { localStorageDebounce } from "../utils/localStorageDebounce";
import { DATE_TIME_NO_SECONDS } from "../../commonUtils";
import {
  initalVisuals,
  initialSettings,
  LoadedSettingState,
  PotentialSettingState,
} from "./initialData";

export const unitsSlice = createSlice({
  name: "units",
  initialState: initialSettings,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    populateSettingssFromChrome: (
      state,
      { payload }: PayloadAction<LoadedSettingState | {}>
    ) => {
      if ("units" in payload) {
        state.units = payload.units;
      }
      if ("visual" in payload) {
        state.visual = payload.visual;
      }
    },
    updateDay: (
      state,
      { payload: startOfDay }: PayloadAction<string | null>
    ) => {
      if (startOfDay) {
        state.units.shortTerm.startDate = startOfDay;
        state.units.shortTerm.endDate =
          DateTime.now().endOf("day").toFormat(DATE_TIME_NO_SECONDS) ?? "";
      }
    },
    setVisualSetting: (
      state,
      { payload: { key, value } }: PayloadAction<KeyValuePair>
    ) => {
      state.visual[key] = value;
      localStorageDebounce(state, "settings");
    },
    setDateTimeFormats: (
      state,
      { payload }: PayloadAction<DateFormat & TimeFormat>
    ) => {
      state.visual = { ...state.visual, ...payload };
      updateStorage({ storageKey: "settings", val: state });
    },
    resetVisualSetting: (state) => {
      state.visual = initalVisuals;
      updateStorage({ storageKey: "settings", val: state });
    },
    setPartialTerm: <T extends boolean>(
      state: PotentialSettingState,
      {
        payload: { key, termPart },
      }: PayloadAction<{
        termPart: Partial<UnitType<T>>;
        key: number;
      }>
    ) => {
      state.units.terms[key] = { ...state.units.terms[key], ...termPart };
      updateStorage({ storageKey: "settings", val: state });
    },
  },
});

export const {
  populateSettingssFromChrome,
  setVisualSetting,
  setDateTimeFormats,
  resetVisualSetting,
  setPartialTerm,
  updateDay,
} = unitsSlice.actions;

export const selectTimeFormat = (state: RootState) =>
  state.settings.visual.timeFormat;
export const selectDateFormat = (state: RootState) =>
  state.settings.visual.dateFormat;
export const selectAllUnits = (state: RootState) => state.settings.units.terms;
export const selectTerm = (termIndex: number) => (state: RootState) =>
  state.settings.units.terms[termIndex];
export const selectShortTerm = (state: RootState) =>
  state.settings.units.shortTerm;
export const selectMediumTerm = (state: RootState) =>
  state.settings.units.mediumTerm;
export const selectLongTerm = (state: RootState) =>
  state.settings.units.longTerm;
export const selectVisualSettings = (state: RootState) => state.settings.visual;

export default unitsSlice.reducer;
