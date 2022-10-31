import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import { RootState } from "../../app/store";

export type Title = string;
export interface SettingsState {
  units: UnitsState;
  visual: Visual;
}
export interface UnitsState {
  shortTerm: UnitType | LegacyUnitType;
  mediumTerm: UnitType | LegacyUnitType;
  longTerm: UnitType | LegacyUnitType;
}
interface UnitType extends baseUnitType {
  duration: string;
}
interface LegacyUnitType extends baseUnitType {
  endDate: string;
}
interface baseUnitType {
  startDate: string;
  title: Title;
  unitType: string;
}
interface BgColor {
  bgColor: string;
}
interface FontColor {
  fontColor: string;
}
interface SecondFontColor {
  secondFontColor: string;
}

interface KeyValuePair {
  key: keyof BgColor | keyof FontColor | keyof SecondFontColor;
  value: string;
}

export interface Visual extends BgColor, FontColor, SecondFontColor {}

const referenceSprintStartDate = DateTime.fromObject(
  { year: 2022, month: 10, day: 10, hour: 10 },
  { zone: "America/New_York" }
).toISO();

const referenceQuarterStartDate = DateTime.fromObject(
  { year: 2022, month: 8, day: 15, hour: 10 },
  { zone: "America/New_York" }
).toISO();

const shortTerm: LegacyUnitType = {
  unitType: "day",
  title: "Today",
  endDate: DateTime.now().endOf("day").toISO(),
  startDate: DateTime.now().startOf("day").toISO(),
};

const mediumTerm: UnitType = {
  unitType: "sprint",
  title: "Sprint",
  duration: "2 weeks",
  startDate: referenceSprintStartDate,
};

const longTerm: UnitType = {
  unitType: "quarter",
  title: "Quarter",
  duration: "13 weeks",
  startDate: referenceQuarterStartDate,
};

const initialUnits: UnitsState = {
  shortTerm: shortTerm,
  mediumTerm: mediumTerm,
  longTerm: longTerm,
};

const initalVisuals: Visual = {
  bgColor: "#222",
  fontColor: "white",
  secondFontColor: "#ffffff4d",
};

const initialSettings: SettingsState = {
  units: initialUnits,
  visual: initalVisuals,
};

export const unitsSlice = createSlice({
  name: "units",
  initialState: initialSettings,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    populateSettingssFromChrome: (
      state,
      { payload }: PayloadAction<SettingsState | {}>
    ) => {
      if ("units" in payload) {
        const { units } = payload;
        state.units = units;
      }
      if ("visual" in payload) {
        state.visual = payload.visual;
      }
    },
    setVisualSetting: (
      state,
      { payload: { key, value } }: PayloadAction<KeyValuePair>
    ) => {
      state.visual[key] = value;
    },
  },
});

export const { populateSettingssFromChrome, setVisualSetting } =
  unitsSlice.actions;

export const selectAllUnits = (state: RootState) => state.settings.units;
export const selectShortTerm = (state: RootState) =>
  state.settings.units.shortTerm;
export const selectMediumTerm = (state: RootState) =>
  state.settings.units.mediumTerm;
export const selectLongTerm = (state: RootState) =>
  state.settings.units.longTerm;
export const selectVisualSettings = (state: RootState) => state.settings.visual;

export default unitsSlice.reducer;
