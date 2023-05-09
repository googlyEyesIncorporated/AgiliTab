import { SyntheticEvent, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  add,
  clearAll,
  clearDone,
} from "../../../features/itemList/itemListSlice";
import { v4 as uuidv4 } from "uuid";
import { selectVisualSettings } from "../../../features/settings/settingsSlice";
import { ListKey } from "../../../features/itemList/types";

export const Options = ({
  shouldShowOptions = false,
  listKey,
  toggleOptions,
}: {
  listKey: ListKey;
  shouldShowOptions: boolean;
  toggleOptions: () => void;
}) => {
  const { fontColor, secondFontColor, bgColor } =
    useAppSelector(selectVisualSettings);
  const dispatch = useAppDispatch();
  const inputRef: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);

  const addClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (inputRef.current?.value) {
      dispatch(
        add({
          listKey,
          item: {
            id: uuidv4(),
            name: inputRef.current.value,
            done: false,
          },
        })
      );
      inputRef.current.value = "";
    }
  };

  const clearAllTasks = () => {
    dispatch(clearAll({ listKey }));
  };

  const clearDoneTasks = () => {
    dispatch(clearDone({ listKey }));
  };

  useEffect(() => {
    if (shouldShowOptions) {
      inputRef.current?.focus();
    }
  }, [shouldShowOptions]);

  return (
    <div className={`edit-priorities${shouldShowOptions ? "" : " hidden"}`}>
      <form id={`todo-form-${listKey}`}>
        <input
          ref={inputRef}
          type="text"
          style={{
            color: fontColor,
            backgroundColor: bgColor,
            borderColor: fontColor,
          }}
          className="todo"
        />{" "}
        <input
          type="submit"
          id="submit"
          value="Add"
          onClick={addClick}
          style={{ color: fontColor }}
          className="add-item-button"
        />
      </form>
      <button
        id={`sweep-${listKey}`}
        className="button-class sweep-link link"
        style={{ color: secondFontColor }}
        onClick={clearDoneTasks}
      >
        Clear Done
      </button>
      {" | "}
      <button
        id={`clear-all-${listKey}`}
        style={{ color: secondFontColor }}
        className="button-class clear-all-link"
        onClick={clearAllTasks}
      >
        Clear All
      </button>
      {" | "}
      <button
        style={{ color: secondFontColor }}
        className="button-class hide-edit"
        onClick={toggleOptions}
      >
        Hide
      </button>
    </div>
  );
};