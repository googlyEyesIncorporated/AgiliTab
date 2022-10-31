export type ItemList = Item[];
export interface Item {
  id: string;
  name: string;
  done: boolean;
}
export interface ItemListState {
  shortTermList: ItemList;
  mediumTermList: ItemList;
  longTermList: ItemList;
}
export type ListKey = keyof ItemListState;

export type StorageKey = ListKey | "settings";

export interface ReplaceList extends JustListKey {
  itemList: ItemList;
  save?: boolean;
}
export interface ListAndIndex extends JustListKey {
  index: number;
}
export interface ListAndItem extends JustListKey {
  item: Item;
}
export interface JustListKey {
  listKey: ListKey;
}

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
export interface UnitType extends baseUnitType {
  duration: string;
}
export interface LegacyUnitType extends baseUnitType {
  endDate: string;
}
export interface baseUnitType {
  startDate: string;
  title: Title;
  unitType: string;
}
export interface BgColor {
  bgColor: string;
}
export interface FontColor {
  fontColor: string;
}
export interface SecondFontColor {
  secondFontColor: string;
}

export interface KeyValuePair {
  key: keyof BgColor | keyof FontColor | keyof SecondFontColor;
  value: string;
}

export interface Visual extends BgColor, FontColor, SecondFontColor {}
