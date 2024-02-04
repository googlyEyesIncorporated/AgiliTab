import { useAppDispatch } from "../../app/hooks";
import { setNotShortTerm, setPartialTerm } from "./settingsSlice";
import { DurationState } from "./types";

export interface OnSaveProps {
  enabled: boolean;
  isDuration: boolean;
  duration: DurationState;
  startDate: string;
  dispatch: ReturnType<typeof useAppDispatch>;
  groupId: number;
  unitType: string;
  title: string;
  endDate: string;
}

export interface OnSave2Props {
  enabled: boolean;
  groupId: number;
  dispatch: ReturnType<typeof useAppDispatch>;
  termPart: {
    isDuration?: boolean;
    duration?: DurationState;
    startDate?: string;
    unitType?: string;
    title?: string;
    endDate?: string;
  };
}

export const saveTerm = ({
  enabled,
  isDuration,
  duration,
  startDate,
  dispatch,
  groupId,
  unitType,
  title,
  endDate,
}: OnSaveProps) => {
  if (enabled) {
    if (isDuration) {
      dispatch(
        setNotShortTerm({
          key: groupId,
          termObj: {
            duration,
            isDuration,
            startDate,
            unitType,
            title,
          },
        })
      );
    } else {
      dispatch(
        setNotShortTerm({
          key: groupId,
          termObj: {
            isDuration,
            startDate,
            endDate,
            unitType,
            title,
          },
        })
      );
    }
  }
};

export const saveTerm2 = ({
  enabled,
  groupId,
  dispatch,
  termPart,
}: OnSave2Props) => {
  if (enabled) {
    dispatch(
      setPartialTerm({
        key: groupId,
        termPart,
      })
    );
  }
};
