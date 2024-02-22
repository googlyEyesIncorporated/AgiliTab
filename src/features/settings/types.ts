export interface DurationState {
  unit: string;
  qty: number;
}

export interface UnitTypeWithDuration
  extends UnitTypeWithTimeFrame<"duration"> {
  duration: DurationState;
}

export type UnitTypes = "duration" | "date" | "none";

export interface CommonUnitTypeProps<T extends UnitTypes> {
  type: T;
  title: string;
}

interface UnitTypeWithTimeFrame<T extends UnitTypes>
  extends CommonUnitTypeProps<T> {
  startDate: string;
  endDate?: string;
}

export interface UnitTypeWithoutDuration extends UnitTypeWithTimeFrame<"date"> {
  endDate: string;
}

export type UnitType<T extends UnitTypes> = T extends "duration"
  ? UnitTypeWithDuration
  : T extends "date"
  ? UnitTypeWithoutDuration
  : CommonUnitTypeProps<"none">;

export interface SettingsState<
  T extends UnitTypes,
  U extends UnitTypes,
  V extends UnitTypes,
> {
  units: UnitsState<T, U, V>;
  visual: Visual;
}

export interface BooleanPayload {
  value: boolean;
}

export interface UnitsState<
  T extends UnitTypes,
  U extends UnitTypes,
  V extends UnitTypes,
> {
  terms: UnitType<T & U & V>[];
  shortTerm: UnitType<T>;
  mediumTerm: UnitType<U>;
  longTerm: UnitType<V>;
}

export interface DateFormat {
  dateFormat: string;
}

export interface TimeFormat {
  timeFormat: string;
}

export interface KeyValuePair {
  key:
    | keyof BgColor
    | keyof FontColor
    | keyof SecondFontColor
    | keyof TimeFormat
    | keyof DateFormat;
  value: string;
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

export interface Visual extends BgColor, FontColor, SecondFontColor {
  dateFormat: string;
  timeFormat: string;
}
