import { ItemListState } from "../features/itemList/types";
import { PotentialSettingState } from "../features/settings/initialData";

export interface RootState {
  itemList: ItemListState;
  settings: PotentialSettingState;
}

export type SetBooleanState = React.Dispatch<React.SetStateAction<boolean>>;

export interface StartAndEnd {
  start: number;
  end: number;
}
