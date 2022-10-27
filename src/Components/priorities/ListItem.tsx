import { useState } from "react";
import { ListItemProps } from "../../types";
import { useAppDispatch } from "../../app/hooks";
import { remove, toggleChecked } from "../../features/counter/itemListSlice";

export const ListItem = ({
  name,
  id,
  done = false,
  index,
  listKey,
  dragAndDrop: { dragStart, dragEnd, enterListItem },
}: ListItemProps) => {
  const dispatch = useAppDispatch();
  const [hidden, setHidden] = useState(true);
  const toggleHidden = (bool: boolean) => {
    setHidden(bool);
  };

  const checkboxClick = () => {
    dispatch(toggleChecked({ listKey, index }));
  };

  const removeItem = () => {
    dispatch(remove({ listKey, index }));
  };
  return (
    <li
      className={`todo-card main-bgcolor ${
        done
          ? "shadow-color shadow-border-color"
          : "main-font-color main-border-color"
      }`}
      onMouseEnter={() => toggleHidden(false)}
      onMouseLeave={() => toggleHidden(true)}
      draggable
      onDragStart={() => dragStart({ key: listKey, index })}
      onDragEnter={() => enterListItem({ key: listKey, index })}
      onDragEnd={() => dragEnd()}
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
      <div className={`todo-text${done ? " todo-card-done" : ""}`}>
        {name}
        <button
          onClick={removeItem}
          className={`pull-right${hidden ? " hidden" : " revealed"}`}
        >
          🗑️
        </button>
      </div>
    </li>
  );
};
