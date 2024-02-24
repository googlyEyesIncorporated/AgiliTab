export interface SettingsState {
  visualSettings: Visual;
}

export interface DateFormat {
  dateFormat: string;
}

export interface TimeFormat {
  timeFormat: string;
}

export interface KeyValuePair {
  key: keyof Visual;
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

export interface Visual
  extends BgColor,
    FontColor,
    SecondFontColor,
    DateFormat,
    TimeFormat {}
