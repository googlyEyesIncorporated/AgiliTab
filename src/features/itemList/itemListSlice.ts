import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ItemList,
  ItemListState,
  JustListKey,
  ListAndIndex,
  ListAndItem,
  ReplaceList,
} from "./types";
import { updateStorage } from "../utils/localStorage/updateStorage";
import { RootState } from "../../app/commonTypes";

const initialTodoListState: ItemListState = {
  shortTermList: [],
  mediumTermList: [],
  longTermList: [],
  deleteHistory: [],
  shouldShowToaster: false,
};

export const itemListSlice = createSlice({
  name: "todo",
  initialState: initialTodoListState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    add: (state, action: PayloadAction<ListAndItem>) => {
      const { listKey, item } = action.payload;
      state[listKey].push(item);
      updateStorage({ storageKey: listKey, val: state[listKey] });
    },
    remove: (state, action: PayloadAction<ListAndIndex>) => {
      const { listKey, index } = action.payload;
      state.deleteHistory.push({ items: [state[listKey][index]], listKey });
      state.shouldShowToaster = true;
      state[listKey].splice(index, 1);
      updateStorage({ storageKey: listKey, val: state[listKey] });
    },
    toggleChecked: (state, action: PayloadAction<ListAndIndex>) => {
      const { listKey, index } = action.payload;
      state[listKey][index].done = !state[listKey][index].done;
      updateStorage({ storageKey: listKey, val: state[listKey] });
    },
    clearDone: (state, action: PayloadAction<JustListKey>) => {
      const { listKey } = action.payload;
      const deleteList: ItemList = [];
      state[listKey] = state[listKey].filter((item) => {
        if (item.done) {
          deleteList.push(item);
        }
        return !item.done;
      });
      state.deleteHistory.push({ items: deleteList, listKey });
      state.shouldShowToaster = true;
      updateStorage({ storageKey: listKey, val: state[listKey] });
    },
    clearAll: (state, action: PayloadAction<JustListKey>) => {
      const { listKey } = action.payload;
      state.deleteHistory.push({ items: state[listKey], listKey });
      state.shouldShowToaster = true;
      state[listKey] = [];
      updateStorage({ storageKey: listKey, val: state[listKey] });
    },
    updateList: (state, action: PayloadAction<ReplaceList>) => {
      const { listKey, itemList, save = true } = action.payload;
      state[listKey] = itemList;
      save && updateStorage({ storageKey: listKey, val: state[listKey] });
    },
    updateListItem: (
      state,
      action: PayloadAction<JustListKey & { index: number; name: string }>
    ) => {
      const { listKey, name, index } = action.payload;
      state[listKey][index].name = name;
      updateStorage({ storageKey: listKey, val: state[listKey] });
    },
    populateTasksFromChrome: (
      state,
      { payload }: PayloadAction<ItemListState | {}>
    ) => {
      if (
        "shortTermList" in payload &&
        "mediumTermList" in payload &&
        "longTermList" in payload
      ) {
        const { shortTermList, mediumTermList, longTermList } = payload;
        state.shortTermList = shortTermList;
        state.mediumTermList = mediumTermList;
        state.longTermList = longTermList;
      }
    },
    undoDelete: (state) => {
      if (state.deleteHistory.length) {
        const lastIndex = state.deleteHistory.length - 1;
        const { listKey, items } = state.deleteHistory[lastIndex];
        state.deleteHistory = state.deleteHistory.slice(0, lastIndex);
        if (listKey && Array.isArray(items)) {
          state[listKey] = [...state[listKey], ...items];
          updateStorage({ storageKey: listKey, val: state[listKey] });
        }
      }
    },
    toggleShouldShowToaster: (state, action: PayloadAction<boolean>) => {
      state.shouldShowToaster = action.payload;
    },
  },
});

export const {
  add,
  remove,
  toggleChecked,
  clearAll,
  clearDone,
  undoDelete,
  updateList,
  updateListItem,
  populateTasksFromChrome,
  toggleShouldShowToaster,
} = itemListSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAllLists = (state: RootState) => state.itemList;
export const selectShortTermList = (state: RootState) =>
  state.itemList.shortTermList;
export const selectMediumTermList = (state: RootState) =>
  state.itemList.mediumTermList;
export const selectLongTermList = (state: RootState) =>
  state.itemList.longTermList;
export const selectShouldShowToaster = (state: RootState) =>
  state.itemList.shouldShowToaster;

export default itemListSlice.reducer;
