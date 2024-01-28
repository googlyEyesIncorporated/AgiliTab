export interface DurationState {
  unit: string;
  qty: number;
}

interface UnitTypeWithDuration<T extends boolean>
  extends UnitTypeWithoutDuration<T> {
  duration: DurationState;
}

export interface UnitTypeWithoutDuration<T extends boolean> {
  startDate: string;
  endDate?: string;
  isDuration: T;
  title: string;
  unitType: string;
}

export type UnitType<T extends boolean = true> = T extends true
  ? UnitTypeWithDuration<T>
  : UnitTypeWithoutDuration<T>;

export interface SettingsState<
  T extends boolean,
  U extends boolean,
  V extends boolean,
> {
  units: UnitsState<T, U, V>;
  visual: Visual;
}

export interface BooleanPayload {
  value: boolean;
}

export interface UnitsState<
  T extends boolean,
  U extends boolean,
  V extends boolean,
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
