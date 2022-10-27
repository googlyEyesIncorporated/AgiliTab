import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import itemListReducer from "../features/counter/itemListSlice";
import unitsSlice from "../features/counter/unitsSlice";

export const store = configureStore({
  reducer: {
    itemList: itemListReducer,
    units: unitsSlice,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
