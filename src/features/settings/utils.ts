import { DateTime } from "luxon";
import { useAppDispatch } from "../../app/hooks";
import { setNotShortTerm, toggleRepeat } from "./settingsSlice";
import { DurationState } from "./types";

export type Categories = "medium" | "long";

interface OnSaveProps {
  enabled: boolean;
  isDuration: boolean;
  duration: DurationState;
  startDate: string;
  dispatch: ReturnType<typeof useAppDispatch>;
  category: Categories;
  unitType: string;
  title: string;
  repeat: boolean;
  endDate: string;
}

export const onRepeat =
  (dispatch: ReturnType<typeof useAppDispatch>, category: Categories) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      toggleRepeat({
        key: `${category}Term`,
        value: e.target.checked,
      })
    );
  };

export const saveTerm = ({
  enabled,
  isDuration,
  duration,
  startDate,
  dispatch,
  category,
  unitType,
  title,
  repeat,
  endDate,
}: OnSaveProps) => {
  if (enabled) {
    let durationEndDate;
    if (isDuration) {
      const { unit, qty } = duration;
      durationEndDate = DateTime.fromISO(startDate)
        .plus({ [unit]: qty })
        .toISO();

      dispatch(
        setNotShortTerm({
          key: `${category}Term`,
          termObj: {
            duration: { unit, qty },
            isDuration,
            startDate,
            unitType,
            title,
            repeat,
          },
        })
      );
    } else {
      dispatch(
        setNotShortTerm({
          key: `${category}Term`,
          termObj: {
            duration,
            isDuration,
            startDate,
            endDate: durationEndDate ?? endDate,
            unitType,
            title,
            repeat,
          },
        })
      );
    }
  }
};
