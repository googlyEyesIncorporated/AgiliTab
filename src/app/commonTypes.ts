import { ItemListState } from "../features/itemList/types";
import { SettingsState } from "../features/settings/types";

export interface RootState {
  itemList: ItemListState;
  settings: SettingsState;
}

export type SetBooleanState = React.Dispatch<React.SetStateAction<boolean>>;

export interface startAndEnd {
  start: number;
  end: number;
}
