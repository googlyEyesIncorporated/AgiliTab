import { DateTime } from "luxon";
import { DATE_TIME_NO_SECONDS } from "../../commonUtils";
import { SettingsState, UnitType, UnitsState, Visual } from "./types";

const Now = DateTime.now();
const reference = {
  now: Now,
  workDay: {
    times: {
      start: "09:00",
      end: "17:00",
    },
  },
  month: {
    start: Now.startOf("month").toFormat(DATE_TIME_NO_SECONDS) ?? "",
    end: "",
  },
  year: {
    start: Now.startOf("year").toFormat(DATE_TIME_NO_SECONDS),
    end: "",
  },
  durations: {
    shortTerm: { unit: "days", qty: 1 },
    mediumTerm: { unit: "months", qty: 1 },
    longTerm: { unit: "years", qty: 1 },
  },
};
reference.month.end =
  DateTime.fromISO(reference.month.start)
    .plus({ months: 1 })
    .toFormat(DATE_TIME_NO_SECONDS) ?? "";
reference.year.end =
  DateTime.fromISO(reference.year.start ?? "")
    .plus({ years: 1 })
    .toFormat(DATE_TIME_NO_SECONDS) ?? "";

export const endOfToday = DateTime.now().endOf("day");
export const startOfToday = DateTime.now().startOf("day");

export const initalVisuals: Visual = {
  bgColor: "#CFCFCF",
  fontColor: "#4F4F4F",
  secondFontColor: "#4F4F4F",
  dateFormat: "MMM dd, yyyy",
  timeFormat: "h:mm a",
};

export const defaultShortTerm: UnitType = {
  title: "Today",
  duration: reference.durations.shortTerm,
  endDate: endOfToday.toFormat(DATE_TIME_NO_SECONDS) ?? "",
  startDate: startOfToday.toFormat(DATE_TIME_NO_SECONDS) ?? "",
  isDuration: true,
  noTerm: false,
};

export const defaultMediumTerm: UnitType = {
  title: "Month",
  duration: reference.durations.mediumTerm,
  endDate: reference.month.end,
  startDate: reference.month.start,
  isDuration: true,
  noTerm: false,
};

export const defaultLongTerm: UnitType = {
  title: "Year",
  duration: reference.durations.longTerm,
  endDate: reference.year.end,
  startDate: reference.year.start ?? "",
  isDuration: true,
  noTerm: false,
};

export const defaultTerms: Record<number, UnitType | UnitType<false>> = {
  0: defaultShortTerm,
  1: defaultMediumTerm,
  2: defaultLongTerm,
};

const initialUnits: UnitsState<
  (typeof defaultShortTerm)["isDuration"],
  (typeof defaultMediumTerm)["isDuration"],
  (typeof defaultLongTerm)["isDuration"]
> = {
  terms: [defaultShortTerm, defaultMediumTerm, defaultLongTerm],
  shortTerm: defaultShortTerm,
  mediumTerm: defaultMediumTerm,
  longTerm: defaultLongTerm,
};

export const initialSettings: LoadedSettingState = {
  units: initialUnits,
  visual: initalVisuals,
};

export type LoadedSettingState = SettingsState<
  (typeof initialUnits.shortTerm)["isDuration"],
  (typeof initialUnits.mediumTerm)["isDuration"],
  (typeof initialUnits.longTerm)["isDuration"]
>;

export type PotentialSettingState = SettingsState<boolean, boolean, boolean>;
