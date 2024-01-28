export interface DurationState {
  unit: string;
  qty: number;
}

export interface UnitType {
  startDate: string;
  endDate?: string;
  isDuration: boolean;
  duration: DurationState;
  title: string;
  unitType: string;
}

export interface SettingsState {
  units: UnitsState;
  visual: Visual;
}

export interface BooleanPayload {
  value: boolean;
}

export interface UnitsState {
  terms: UnitType[];
  shortTerm: UnitType;
  mediumTerm: UnitType;
  longTerm: UnitType;
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
