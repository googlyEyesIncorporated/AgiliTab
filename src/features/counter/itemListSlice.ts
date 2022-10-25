import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  AddAction,
  ItemListState,
  JustListKey,
  MoveAction,
  RemoveAction,
  ToggleCheckedAction,
} from "../../types";

const initialTodoListState: ItemListState = {
  firstList: [{ id: "todo-left-1-check", name: "something", done: false }],
  secondList: [{ id: "todo-mid-1-check", name: "something", done: false }],
  thirdList: [{ id: "todo-right-1-check", name: "something", done: false }],
};

export const itemListSlice = createSlice({
  name: "todo",
  initialState: initialTodoListState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    add: (state, action: PayloadAction<AddAction>) => {
      const { listKey, item } = action.payload;
      state[listKey].push(item);
    },
    remove: (state, action: PayloadAction<RemoveAction>) => {
      const { listKey, index } = action.payload;
      state[listKey].splice(index, 1);
    },
    move: (state, action: PayloadAction<MoveAction>) => {
      const { item, place } = action.payload;
      state[place.listKey].splice(place.index, 0, item.item);
    },
    toggleChecked: (state, action: PayloadAction<ToggleCheckedAction>) => {
      const { listKey, index } = action.payload;
      state[listKey][index].done = !state[listKey][index].done;
    },
    clearDone: (state, action: PayloadAction<JustListKey>) => {
      const { listKey } = action.payload;
      state[listKey] = state[listKey].filter((item) => {
        return !item.done;
      });
    },
    clearAll: (state, action: PayloadAction<JustListKey>) => {
      const { listKey } = action.payload;
      state[listKey] = [];
    },
  },
});

export const { add, remove, move, toggleChecked, clearAll, clearDone } =
  itemListSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAllLists = (state: RootState) => state.itemList;
export const selectFirstList = (state: RootState) => state.itemList.firstList;
export const selectSecondList = (state: RootState) => state.itemList.secondList;
export const selectThirdList = (state: RootState) => state.itemList.thirdList;

export default itemListSlice.reducer;
