import { DateTime } from "luxon";

export interface UnitTypes {
  firstUnit: UnitType;
  secondUnit: UnitType;
  thirdUnit: UnitType;
}

export interface TimeLeftProps extends UnitTypes {
  date?: DateTime;
}

type Title = string;

export interface UnitType {
  endDate: DateTime;
  startDate: DateTime;
  title: Title;
  unitType: string;
}

export interface TopRowProps {
  h24: boolean;
}

export type ListItemProps = {
  name: string;
  done: boolean;
  id: string;
  index: number;
  listKey: ListKey;
  dragAndDrop: Omit<DragAndDrop, "enterList">;
};

export interface ListProps {
  listItems: ListItemProps[];
}

interface listItemObject {
  listItems: ListItemProps[];
}

export interface AllListItems {
  firstListItems: listItemObject;
  secondListItems: listItemObject;
  thirdListItems: listItemObject;
}

interface Item {
  id: string;
  name: string;
  done: boolean;
}

export type ItemList = Item[];

export interface ItemListState {
  firstList: ItemList;
  secondList: ItemList;
  thirdList: ItemList;
}

interface UnitObj {
  unitType: string;
  title: Title;
  endDate: DateTime;
  startDate: DateTime;
}

export interface UnitsState {
  firstUnit: UnitObj;
  secondUnit: UnitObj;
  thirdUnit: UnitObj;
}

export interface AddAction {
  listKey: ListKey;
  item: Item;
}

export interface RemoveAction {
  listKey: ListKey;
  index: number;
}

export type ListKey = keyof ItemListState;

export interface JustListKey {
  listKey: ListKey;
}

export interface ToggleCheckedAction extends JustListKey {
  index: number;
}

export interface ReplaceList extends JustListKey {
  itemList: ItemList;
  save?: boolean;
}

export interface DragAndDrop {
  enterListItem: (position: Position) => void;
  dragStart: (position: Position) => void;
  dragEnd: () => void;
  enterList: (listKey: ListKey) => void;
}

export interface Position {
  key: ListKey;
  index: number;
}

export interface ColumnProps extends ReplaceList {
  title: Title;
  dragAndDrop: DragAndDrop;
}
