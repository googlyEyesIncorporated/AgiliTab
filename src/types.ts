import { DateTime } from "luxon";

export interface UnitTypes {
  firstUnit: UnitType;
  secondUnit: UnitType;
  thirdUnit: UnitType;
}

export interface TimeLeftProps extends UnitTypes {
  date?: DateTime;
}

export interface UnitType {
  endDate: DateTime;
  startDate: DateTime;
  title: string;
  unitType: string;
}

export interface TopRowProps {
  h24: boolean;
}

export type ListItemProps = {
  name: string;
  done: boolean;
  id: string;
  onChange?: () => void;
};

export interface ListProps {
  listItems: ListItemProps[];
}

type SetList = React.Dispatch<
  React.SetStateAction<
    {
      id: string;
      name: string;
      done: boolean;
    }[]
  >
>;

interface listItemObject {
  listItems: ListItemProps[];
  setList?: SetList;
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
  title: string;
  endDate: DateTime;
  startDate: DateTime;
}

export interface UnitsState {
  firstUnit: UnitObj;
  secondUnit: UnitObj;
  thirdUnit: UnitObj;
}

export interface AddAction {
  key: keyof ItemListState;
  index: number;
  item: Item;
}

export interface MoveAction {
  item: AddAction;
  place: AddAction;
}

export type ListKey = "firstList" | "secondList" | "thirdList";

export interface ToggleCheckedAction {
  listKey: ListKey;
  index: number;
}
