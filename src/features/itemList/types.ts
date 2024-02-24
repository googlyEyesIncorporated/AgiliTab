export type ItemList = Item[];
export interface Item {
  id: string;
  name: string;
  done: boolean;
}

interface IDeleteHistory {
  items: ItemList;
  listKey: ListKey;
}

export type ListTypes =
  | UnitTypeWithDuration
  | UnitTypeWithoutDuration
  | CommonUnitTypeProps<"none">;

export type ObjectOfLists = Record<string, ListTypes>;
export interface ItemListState {
  itemList: ObjectOfLists;
  deleteHistory: IDeleteHistory[];
  shouldShowToaster: boolean;
}
export type ListKey = string;

export interface ReplaceList extends JustListKey {
  itemList: ItemList;
  save?: boolean;
}
export interface CreateList extends JustListKey {
  listObject: ListTypes;
}
export interface ListAndIndex extends JustListKey {
  index: number;
}
export interface ListAndItem extends JustListKey {
  item: Item;
}
export interface JustListKey {
  listKey: string;
}

export interface DurationObj {
  unit: string;
  qty: number;
}

export interface UnitTypeWithDuration
  extends UnitTypeWithTimeFrame<"duration"> {
  duration: DurationObj;
}

export type UnitTypes = "duration" | "date" | "none";

export interface CommonUnitTypeProps<T extends UnitTypes> {
  type: T;
  title: string;
  list: ItemList;
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
