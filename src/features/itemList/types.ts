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
export interface ItemListState {
  shortTermList: ItemList;
  mediumTermList: ItemList;
  longTermList: ItemList;
  deleteHistory: IDeleteHistory[];
}
export type ListKey = keyof Omit<ItemListState, "deleteHistory">;
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

export interface StartEndUnitType {
  start: number;
  end: number;
  unitType: string;
}
