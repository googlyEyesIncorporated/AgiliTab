import { SyntheticEvent, useRef } from "react";
import { useAppDispatch } from "../../app/hooks";
import { add, clearAll, clearDone } from "../../features/counter/itemListSlice";
import { ListKey } from "../../types";
import { v4 as uuidv4 } from "uuid";

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

  return (
    <div className={`edit-priorities${shouldShowOptions ? "" : " hidden"}`}>
      <form id={`todo-form-${listKey}`}>
        <input
          ref={inputRef}
          type="text"
          className="todo main-bgcolor main-font-color"
        />{" "}
        <input
          type="submit"
          id="submit"
          value="Add"
          onClick={addClick}
          className="add-item-button main-font-color"
        />
      </form>
      <button
        id={`sweep-${listKey}`}
        className="sweep-link shadow-color link"
        onClick={clearDoneTasks}
      >
        Clear Done
      </button>
      {" | "}
      <button
        id={`clear-all-${listKey}`}
        className="clear-all-link shadow-color"
        onClick={clearAllTasks}
      >
        Clear All
      </button>
      {" | "}
      <button className="hide-edit shadow-color" onClick={toggleOptions}>
        Hide
      </button>
    </div>
  );
};
