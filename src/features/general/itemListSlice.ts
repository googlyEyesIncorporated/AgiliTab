import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  ItemList,
  ItemListState,
  JustListKey,
  ListAndIndex,
  ListAndItem,
  ReplaceList,
} from "./types";
import { updateStorage } from "./storageHelper";

let shortTermList: ItemList = [];
let mediumTermList: ItemList = [];
let longTermList: ItemList = [];

const initialTodoListState: ItemListState = {
  shortTermList,
  mediumTermList,
  longTermList,
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
      state[listKey] = state[listKey].filter((item) => {
        return !item.done;
      });
      updateStorage({ storageKey: listKey, val: state[listKey] });
    },
    clearAll: (state, action: PayloadAction<JustListKey>) => {
      const { listKey } = action.payload;
      state[listKey] = [];
      updateStorage({ storageKey: listKey, val: state[listKey] });
    },
    updateList: (state, action: PayloadAction<ReplaceList>) => {
      const { listKey, itemList, save = true } = action.payload;
      state[listKey] = itemList;
      save && updateStorage({ storageKey: listKey, val: state[listKey] });
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
  },
});

export const {
  add,
  remove,
  toggleChecked,
  clearAll,
  clearDone,
  updateList,
  populateTasksFromChrome,
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

export default itemListSlice.reducer;
