import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import itemListReducer from "../features/itemList/itemListSlice";
import settingsSlice from "../features/settings/settingsSlice";
import { RootState } from "./commonTypes";

export const store = configureStore({
  reducer: {
    itemList: itemListReducer,
    settings: settingsSlice,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
