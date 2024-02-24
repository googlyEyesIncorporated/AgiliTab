import { DateTime } from "luxon";
import { DATE_TIME_NO_SECONDS } from "../../commonUtils";
import { Visual } from "./types";

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

// export const defaultShortTerm: UnitType<"duration"> = {
//   title: "Today",
//   duration: reference.durations.shortTerm,
//   endDate: endOfToday.toFormat(DATE_TIME_NO_SECONDS) ?? "",
//   startDate: startOfToday.toFormat(DATE_TIME_NO_SECONDS) ?? "",
//   type: "duration",
// };

// export const defaultMediumTerm: UnitType<"duration"> = {
//   title: "Month",
//   duration: reference.durations.mediumTerm,
//   endDate: reference.month.end,
//   startDate: reference.month.start,
//   type: "duration",
// };

// export const defaultLongTerm: UnitType<"duration"> = {
//   title: "Year",
//   duration: reference.durations.longTerm,
//   endDate: reference.year.end,
//   startDate: reference.year.start ?? "",
//   type: "duration",
// };

// export const defaultTerms: Record<
//   number,
//   UnitType<"duration"> | UnitType<"date"> | UnitType<"none">
// > = {
//   0: defaultShortTerm,
//   1: defaultMediumTerm,
//   2: defaultLongTerm,
// };

// const initialUnits: UnitsState<
//   (typeof defaultShortTerm)["type"],
//   (typeof defaultMediumTerm)["type"],
//   (typeof defaultLongTerm)["type"]
// > = {
//   terms: [defaultShortTerm, defaultMediumTerm, defaultLongTerm],
//   shortTerm: defaultShortTerm,
//   mediumTerm: defaultMediumTerm,
//   longTerm: defaultLongTerm,
// };

export const initialSettings = {
  visualSettings: initalVisuals,
};
