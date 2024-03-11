import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ItemList,
  ItemListState,
  JustListKey,
  ListAndIndex,
  ListAndItem,
  ReplaceList,
  CreateList,
  UnitTypes,
  UnitType,
  ObjectOfLists,
} from "./types";
import { updateStorage } from "../utils/localStorage/updateStorage";
import { RootState } from "../../app/commonTypes";

const initialTodoListState: ItemListState = {
  itemList: {},
  deleteHistory: [],
  listOrder: [],
  shouldShowToaster: false,
};

export const itemListSlice = createSlice({
  name: "todo",
  initialState: initialTodoListState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    add: (state, action: PayloadAction<ListAndItem>) => {
      const { listKey, item } = action.payload;
      const list = [...state.itemList[listKey].list, item];
      state.itemList[listKey].list = list;
      updateStorage({
        storageKey: listKey,
        val: { ...state.itemList[listKey], list },
      });
    },
    addTerm: (state, action: PayloadAction<CreateList>) => {
      const { listKey, listObject } = action.payload;
      const listOrder = [...state.listOrder, listKey];
      state.listOrder = listOrder;
      state.itemList[listKey] = listObject;
      updateStorage({ storageKey: listKey, val: listObject });
      updateStorage({ storageKey: "listOrder", val: listOrder });
    },
    remove: (state, action: PayloadAction<ListAndIndex>) => {
      const { listKey, index } = action.payload;
      const deleteHistory = [
        ...state.deleteHistory,
        {
          items: [state.itemList[listKey].list[index]],
          listKey,
        },
      ];
      state.deleteHistory = deleteHistory;
      const list = [...state.itemList[listKey].list];
      list.splice(index, 1);
      const itemList = { ...state.itemList[listKey], list };
      state.shouldShowToaster = true;
      state.itemList[listKey] = itemList;
      updateStorage({ storageKey: listKey, val: itemList });
    },
    removeTerm: (state, action: PayloadAction<JustListKey>) => {
      const { listKey } = action.payload;
      const deleteHistory = [
        ...state.deleteHistory,
        {
          list: state.itemList[listKey],
          listKey,
        },
      ];
      const positionInOrder = state.listOrder.findIndex(
        (value) => value === listKey
      );
      if (positionInOrder !== -1) {
        const listOrder = [...state.listOrder];
        listOrder.splice(positionInOrder, 1);

        state.listOrder = listOrder;
        updateStorage({ storageKey: "listOrder", val: listOrder });
      }
      const { [listKey]: termToRemove, ...everythingElse } = state.itemList;
      state.deleteHistory = deleteHistory;
      state.shouldShowToaster = true;
      state.itemList = everythingElse;
      updateStorage({ storageKey: listKey, val: null });
    },
    moveTerm: (state, action: PayloadAction<{ listOrder: string[] }>) => {
      state.listOrder = action.payload.listOrder;
      updateStorage({ storageKey: "listOrder", val: action.payload.listOrder });
    },
    toggleChecked: (state, action: PayloadAction<ListAndIndex>) => {
      const { listKey, index } = action.payload;
      const list = [...state.itemList[listKey].list];
      list[index].done = !list[index].done;
      const itemList = { ...state.itemList[listKey], list };
      state.itemList[listKey] = itemList;
      updateStorage({ storageKey: listKey, val: itemList });
    },
    clearDone: (state, action: PayloadAction<JustListKey>) => {
      const { listKey } = action.payload;
      const deleteList: ItemList = [];
      const list = state.itemList[listKey].list.filter((item) => {
        if (item.done) {
          deleteList.push(item);
          return false;
        }
        return true;
      });
      const itemList = { ...state.itemList[listKey], list };
      state.itemList[listKey] = itemList;
      const deleteHistory = [
        ...state.deleteHistory,
        { items: deleteList, listKey },
      ];
      state.deleteHistory = deleteHistory;
      state.shouldShowToaster = true;
      updateStorage({ storageKey: listKey, val: itemList });
    },
    clearAll: (state, action: PayloadAction<JustListKey>) => {
      const { listKey } = action.payload;
      const deleteHistory = [
        ...state.deleteHistory,
        {
          items: state.itemList[listKey].list,
          listKey,
        },
      ];
      state.deleteHistory = deleteHistory;
      state.shouldShowToaster = true;
      const itemList = { ...state.itemList[listKey], list: [] };
      state.itemList[listKey] = itemList;
      updateStorage({ storageKey: listKey, val: itemList });
    },
    updateList: (state, action: PayloadAction<ReplaceList>) => {
      const { listKey, itemList: list, save = true } = action.payload;
      const itemList = { ...state.itemList[listKey], list };
      state.itemList[listKey] = itemList;
      save && updateStorage({ storageKey: listKey, val: itemList });
    },
    updateListItem: (
      state,
      action: PayloadAction<JustListKey & { index: number; name: string }>
    ) => {
      const { listKey, name, index } = action.payload;
      const list = [...state.itemList[listKey].list];
      list[index].name = name;
      const itemList = { ...state.itemList[listKey], list };

      state.itemList[listKey] = itemList;
      updateStorage({ storageKey: listKey, val: itemList });
    },
    populateTasksFromChrome: (
      state,
      { payload: { itemList } }: PayloadAction<{ itemList: ObjectOfLists }>
    ) => {
      state.itemList = { ...state.itemList, ...itemList };
    },
    populateTaskOrderFromChrome: (
      state,
      { payload: { listOrder } }: PayloadAction<{ listOrder: string[] }>
    ) => {
      state.listOrder = listOrder;
    },
    undoDelete: (state) => {
      if (state.deleteHistory.length) {
        const lastIndex = state.deleteHistory.length - 1;
        const {
          listKey,
          items,
          list: deletedItemList,
        } = state.deleteHistory[lastIndex];
        const itemList = state.itemList[listKey];
        state.deleteHistory = state.deleteHistory.slice(0, lastIndex);

        if (listKey) {
          if (deletedItemList) {
            state.itemList[listKey] = deletedItemList;
            state.listOrder.push(listKey);
            updateStorage({ storageKey: listKey, val: deletedItemList });
            updateStorage({
              storageKey: "listOrder",
              val: [...state.listOrder],
            });
          } else if (Array.isArray(items)) {
            itemList.list = [...itemList.list, ...items];
            state.itemList[listKey] = itemList;
            updateStorage({
              storageKey: listKey,
              val: itemList,
            });
          }
        }
      }
    },
    toggleShouldShowToaster: (state, action: PayloadAction<boolean>) => {
      state.shouldShowToaster = action.payload;
    },
    setPartialTerm: <T extends UnitTypes>(
      state: ItemListState,
      {
        payload: { listKey, termPart },
      }: PayloadAction<{
        termPart: Partial<UnitType<T>>;
        listKey: string;
      }>
    ) => {
      const itemList = {
        ...state.itemList[listKey],
        list: [...state.itemList[listKey].list],
        ...termPart,
      };
      state.itemList[listKey] = itemList;
      updateStorage({ storageKey: listKey, val: itemList });
    },
  },
});

export const {
  add,
  addTerm,
  remove,
  removeTerm,
  moveTerm,
  toggleChecked,
  clearAll,
  clearDone,
  undoDelete,
  updateList,
  updateListItem,
  populateTasksFromChrome,
  populateTaskOrderFromChrome,
  toggleShouldShowToaster,
  setPartialTerm,
} = itemListSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAllLists = (state: RootState) => state.itemList.itemList;
export const selectListOrder = (state: RootState) => state.itemList.listOrder;
export const selectTermList = (state: RootState, key: string) =>
  state.itemList.itemList[key];
export const selectShouldShowToaster = (state: RootState) =>
  state.itemList.shouldShowToaster;

export default itemListSlice.reducer;
