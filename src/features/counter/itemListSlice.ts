import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  AddAction,
  ItemList,
  ItemListState,
  JustListKey,
  ListKey,
  RemoveAction,
  ReplaceList,
  ToggleCheckedAction,
} from "../../types";

let firstList: ItemList = [];
let secondList: ItemList = [];
let thirdList: ItemList = [];

const updateStorage = ({
  listKey,
  itemList,
}: {
  listKey: ListKey;
  itemList: ItemList;
}) => {
  chrome.storage.sync.set({ [listKey]: itemList });
};

const initialTodoListState: ItemListState = {
  firstList,
  secondList,
  thirdList,
};

export const itemListSlice = createSlice({
  name: "todo",
  initialState: initialTodoListState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    add: (state, action: PayloadAction<AddAction>) => {
      const { listKey, item } = action.payload;
      state[listKey].push(item);
      updateStorage({ listKey, itemList: state[listKey] });
    },
    remove: (state, action: PayloadAction<RemoveAction>) => {
      const { listKey, index } = action.payload;
      state[listKey].splice(index, 1);
      updateStorage({ listKey, itemList: state[listKey] });
    },
    toggleChecked: (state, action: PayloadAction<ToggleCheckedAction>) => {
      const { listKey, index } = action.payload;
      state[listKey][index].done = !state[listKey][index].done;
      updateStorage({ listKey, itemList: state[listKey] });
    },
    clearDone: (state, action: PayloadAction<JustListKey>) => {
      const { listKey } = action.payload;
      state[listKey] = state[listKey].filter((item) => {
        return !item.done;
      });
      updateStorage({ listKey, itemList: state[listKey] });
    },
    clearAll: (state, action: PayloadAction<JustListKey>) => {
      const { listKey } = action.payload;
      state[listKey] = [];
      updateStorage({ listKey, itemList: state[listKey] });
    },
    updateList: (state, action: PayloadAction<ReplaceList>) => {
      const { listKey, itemList, save = true } = action.payload;
      state[listKey] = itemList;
      save && updateStorage({ listKey, itemList: state[listKey] });
    },
  },
});

export const { add, remove, toggleChecked, clearAll, clearDone, updateList } =
  itemListSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAllLists = (state: RootState) => state.itemList;
export const selectFirstList = (state: RootState) => state.itemList.firstList;
export const selectSecondList = (state: RootState) => state.itemList.secondList;
export const selectThirdList = (state: RootState) => state.itemList.thirdList;

export default itemListSlice.reducer;
