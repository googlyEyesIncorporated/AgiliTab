import React from "react";
import { ListItemProps, ListKey } from "../../types";
import { useAppDispatch } from "../../app/hooks";
import { toggleChecked } from "../../features/counter/itemListSlice";

export const ListItem = ({
  name,
  id,
  done = false,
  index,
  listKey,
}: ListItemProps & {
  index: number;
  listKey: ListKey;
}) => {
  const dispatch = useAppDispatch();

  const checkboxClick = () => {
    dispatch(toggleChecked({ listKey, index }));
  };
  return (
    <li
      className={`todo-card main-bgcolor ${
        done
          ? "shadow-color shadow-border-color"
          : "main-font-color main-border-color"
      }`}
    >
      <div className="squaredThree">
        <input
          type="checkbox"
          name="check"
          id={id}
          onChange={checkboxClick}
          key={id}
          checked={done}
        />
        <label htmlFor={id} />
      </div>
      <div className={`todo-text${done ? "todo-card-done" : ""}`}>{name}</div>
    </li>
  );
};
