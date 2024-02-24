import { SyntheticEvent, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  add,
  clearAll,
  clearDone,
} from "../../../features/itemList/itemListSlice";
import { v4 as uuidv4 } from "uuid";
import { selectVisualSettings } from "../../../features/settings/settingsSlice";

const buttonClasses = "border-none bg-transparent cursor-pointer";

export const Options = ({
  shouldShowOptions = false,
  listKey,
  toggleOptions,
  groupId,
}: {
  listKey: string;
  shouldShowOptions: boolean;
  toggleOptions: () => void;
  groupId: string;
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
    <div
      data-testid={`group-${groupId}-options`}
      className={`text-center fade-in-1s${shouldShowOptions ? "" : " hidden"}`}
    >
      <form className="inline-block w-full mb-2">
        <input
          data-testid={`todo-input-${listKey}`}
          ref={inputRef}
          type="text"
          style={{
            color: fontColor,
            backgroundColor: bgColor,
            borderColor: fontColor,
          }}
          className="todo leading-none p-2"
        />{" "}
        <input
          type="submit"
          data-testid={`${listKey}-add-item-button`}
          value="Add"
          onClick={addClick}
          style={{ color: secondFontColor }}
          className="text-base background-none shadow-none border-none"
        />
      </form>
      <button
        className={`${buttonClasses} text-base no-underline link`}
        style={{ color: secondFontColor }}
        onClick={clearDoneTasks}
      >
        Clear Done
      </button>
      {" | "}
      <button
        style={{ color: secondFontColor }}
        className={`${buttonClasses} text-base no-underline`}
        onClick={clearAllTasks}
      >
        Clear All
      </button>
      {" | "}
      <button
        style={{ color: secondFontColor }}
        className={`${buttonClasses} text-base no-underline`}
        onClick={toggleOptions}
      >
        Hide
      </button>
    </div>
  );
};
