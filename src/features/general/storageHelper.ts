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

export const updateStorage = ({
  listKey,
  itemList,
}: {
  listKey: ListKey;
  itemList: ItemList;
}) => {
  if (chrome.storage) {
    chrome.storage.sync.set({ [listKey]: itemList });
  }
};
