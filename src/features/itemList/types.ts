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
