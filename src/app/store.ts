import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import itemListReducer from "../features/itemList/itemListSlice";
import settingsSlice from "../features/Settings/settingsSlice";

export const store = configureStore({
  reducer: {
    itemList: itemListReducer,
    settings: settingsSlice,
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
