import { DateTime } from "luxon";

export interface UnitTypes {
  shortTerm: UnitType;
  mediumTerm: UnitType;
  longTerm: UnitType;
}

export interface TimeLeftProps extends UnitTypes {
  date?: DateTime;
}

type Title = string;

export interface UnitType {
  endDate: string;
  startDate: string;
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
  shortTermListItems: listItemObject;
  mediumTermListItems: listItemObject;
  longListItems: listItemObject;
}

interface Item {
  id: string;
  name: string;
  done: boolean;
}

export type ItemList = Item[];

export interface ItemListState {
  shortTermList: ItemList;
  mediumTermList: ItemList;
  longTermList: ItemList;
}

export interface UnitsState {
  shortTerm: UnitType;
  mediumTerm: UnitType;
  longTerm: UnitType;
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
