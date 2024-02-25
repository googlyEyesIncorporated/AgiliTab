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

// TODO: start off better

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
      state.itemList[listKey].list.push(item);
      updateStorage({ storageKey: listKey, val: state.itemList[listKey] });
    },
    addTerm: (state, action: PayloadAction<CreateList>) => {
      const { listKey, listObject } = action.payload;
      state.listOrder.push(listKey);
      state.itemList[listKey] = listObject;
      updateStorage({ storageKey: listKey, val: state.itemList[listKey] });
      updateStorage({ storageKey: "listOrder", val: state.listOrder });
    },
    remove: (state, action: PayloadAction<ListAndIndex>) => {
      const { listKey, index } = action.payload;
      state.deleteHistory.push({
        items: [state.itemList[listKey].list[index]],
        listKey,
      });
      state.shouldShowToaster = true;
      state.itemList[listKey].list.splice(index, 1);
      updateStorage({ storageKey: listKey, val: state.itemList[listKey] });
    },
    removeTerm: (state, action: PayloadAction<JustListKey>) => {
      const { listKey } = action.payload;
      state.deleteHistory.push({
        list: state.itemList[listKey],
        listKey,
      });
      const positionInOrder = state.listOrder.findIndex(
        (value) => value === listKey
      );
      if (positionInOrder !== -1) {
        state.listOrder.splice(positionInOrder, 1);
      }
      const { [listKey]: termToRemove, ...everythingElse } = state.itemList;
      state.itemList = everythingElse;
      updateStorage({ storageKey: listKey, val: null });
      updateStorage({ storageKey: "listOrder", val: state.listOrder });
    },
    moveTerm: (state, action: PayloadAction<ListAndIndex>) => {
      const { listKey, index } = action.payload;
      state.deleteHistory.push({
        list: state.itemList[listKey],
        listKey,
      });
      const positionInOrder = state.listOrder.findIndex(
        (value) => value === listKey
      );
      if (positionInOrder !== -1) {
        const modifier = positionInOrder <= index ? -1 : 0;
        const removedList = state.listOrder.splice(positionInOrder, 1);
        state.listOrder.splice(index + modifier, 0, removedList[0]);
      }
      updateStorage({ storageKey: "listOrder", val: state.listOrder });
    },
    toggleChecked: (state, action: PayloadAction<ListAndIndex>) => {
      const { listKey, index } = action.payload;
      state.itemList[listKey].list[index].done =
        !state.itemList[listKey].list[index].done;
      updateStorage({ storageKey: listKey, val: state.itemList[listKey] });
    },
    clearDone: (state, action: PayloadAction<JustListKey>) => {
      const { listKey } = action.payload;
      const deleteList: ItemList = [];
      state.itemList[listKey].list = state.itemList[listKey].list.filter(
        (item) => {
          if (item.done) {
            deleteList.push(item);
          }
          return !item.done;
        }
      );
      state.deleteHistory.push({ items: deleteList, listKey });
      state.shouldShowToaster = true;
      updateStorage({ storageKey: listKey, val: state.itemList[listKey] });
    },
    clearAll: (state, action: PayloadAction<JustListKey>) => {
      const { listKey } = action.payload;
      state.deleteHistory.push({
        items: state.itemList[listKey].list,
        listKey,
      });
      state.shouldShowToaster = true;
      state.itemList[listKey].list = [];
      updateStorage({ storageKey: listKey, val: state.itemList[listKey] });
    },
    updateList: (state, action: PayloadAction<ReplaceList>) => {
      const { listKey, itemList, save = true } = action.payload;
      state.itemList[listKey].list = itemList;
      save &&
        updateStorage({ storageKey: listKey, val: state.itemList[listKey] });
    },
    updateListItem: (
      state,
      action: PayloadAction<JustListKey & { index: number; name: string }>
    ) => {
      const { listKey, name, index } = action.payload;
      state.itemList[listKey].list[index].name = name;
      updateStorage({ storageKey: listKey, val: state.itemList[listKey] });
    },
    populateTasksFromChrome: (
      state,
      { payload: { itemList } }: PayloadAction<{ itemList: ObjectOfLists }>
    ) => {
      state.itemList = { ...state.itemList, ...itemList };
    },
    undoDelete: (state) => {
      if (state.deleteHistory.length) {
        const lastIndex = state.deleteHistory.length - 1;
        const { listKey, items, list } = state.deleteHistory[lastIndex];
        state.deleteHistory = state.deleteHistory.slice(0, lastIndex);
        if (listKey || list) {
          if (list) {
            state.itemList[listKey] = list;
            updateStorage({ storageKey: listKey, val: list });
          } else if (Array.isArray(items)) {
            state.itemList[listKey].list = [
              ...state.itemList[listKey].list,
              ...items,
            ];
            updateStorage({
              storageKey: listKey,
              val: state.itemList[listKey],
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
      console.log(termPart);
      state.itemList[listKey] = { ...state.itemList[listKey], ...termPart };
      updateStorage({
        storageKey: listKey,
        val: {
          ...state.itemList[listKey],
          list: [...state.itemList[listKey].list],
        },
      });
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
  toggleShouldShowToaster,
  setPartialTerm,
} = itemListSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAllLists = (state: RootState) => state.itemList.itemList;
export const selectTermList = (state: RootState, key: string) =>
  state.itemList.itemList[key];
export const selectShouldShowToaster = (state: RootState) =>
  state.itemList.shouldShowToaster;

export default itemListSlice.reducer;
