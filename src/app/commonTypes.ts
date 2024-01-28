import { ItemListState } from "../features/itemList/types";
import { LoadedSettingState } from "../features/settings/initialData";

export interface RootState {
  itemList: ItemListState;
  settings: LoadedSettingState;
}

export type SetBooleanState = React.Dispatch<React.SetStateAction<boolean>>;

export interface startAndEnd {
  start: number;
  end: number;
}
