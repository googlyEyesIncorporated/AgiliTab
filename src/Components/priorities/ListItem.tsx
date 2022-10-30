import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  remove,
  toggleChecked,
  ListKey,
  ListAndIndex,
} from "../../features/counter/itemListSlice";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface DragAndDrop {
  enterListItem: (position: ListAndIndex) => void;
  dragStart: (position: ListAndIndex) => void;
  dragEnd: () => void;
  enterList: (listKey: ListKey) => void;
}

type ListItemProps = {
  name: string;
  done: boolean;
  id: string;
  index: number;
  listKey: ListKey;
  dragAndDrop: Omit<DragAndDrop, "enterList">;
};

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
      onDragStart={() => dragStart({ listKey, index })}
      onDragEnter={() => enterListItem({ listKey, index })}
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
        <FontAwesomeIcon
          onClick={removeItem}
          icon={faTrash}
          className={`main-font-color pull-right${
            hidden ? " hidden" : " revealed"
          }`}
        />
      </div>
    </li>
  );
};
