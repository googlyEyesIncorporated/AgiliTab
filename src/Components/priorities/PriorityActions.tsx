import React, { SyntheticEvent } from "react";
import { useAppDispatch } from "../../app/hooks";
import { clearAll, clearDone } from "../../features/counter/itemListSlice";
import { ListKey } from "../../types";

const addClick = (event: SyntheticEvent) => {
  event.stopPropagation();
  event.preventDefault();
};

export const Options = ({
  shouldShowOptions = false,
  listKey,
  toggleOptions,
}: {
  listKey: ListKey;
  shouldShowOptions: boolean;
  toggleOptions: () => void;
}) => {
  const dispatch = useAppDispatch();

  const clearDoneTasks = () => {
    dispatch(clearDone({ listKey }));
  };

  const clearAllTasks = () => {
    dispatch(clearAll({ listKey }));
  };

  return (
    <div className={`edit-priorities${shouldShowOptions ? "" : " hidden"}`}>
      <form id={`todo-form-${listKey}`}>
        <input type="text" className="todo main-bgcolor main-font-color" />
        <input
          type="submit"
          id="submit"
          value="Add"
          onClick={addClick}
          className="add-item-button main-font-color"
        />
      </form>
      <a
        href="#"
        id={`sweep-${listKey}`}
        className="sweep-link shadow-color"
        onClick={clearDoneTasks}
      >
        Clear Done
      </a>{" "}
      |
      <a
        href="#"
        id={`clear-all-${listKey}`}
        className="clear-all-link shadow-color"
        onClick={clearAllTasks}
      >
        Clear All
      </a>{" "}
      |
      <a href="#" className="hide-edit shadow-color" onClick={toggleOptions}>
        Hide
      </a>
    </div>
  );
};
