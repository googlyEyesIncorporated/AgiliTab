import { useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectVisualSettings } from "../../features/general/settingsSlice";
import { remove, toggleChecked } from "../../features/general/itemListSlice";
import { ListAndIndex, ListKey } from "../../features/general/types";

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
  const { fontColor, secondFontColor, bgColor } =
    useAppSelector(selectVisualSettings);
  const checkboxClick = () => {
    dispatch(toggleChecked({ listKey, index }));
  };

  const removeItem = () => {
    dispatch(remove({ listKey, index }));
  };
  return (
    <li
      className={`todo-card`}
      style={{
        color: done ? secondFontColor : fontColor,
        borderColor: done ? secondFontColor : fontColor,
        backgroundColor: bgColor,
      }}
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
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
          style={{ color: secondFontColor }}
          checked={done}
        />
        <label htmlFor={id} />
      </div>
      <div className={`todo-text${done ? " todo-card-done" : ""}`}>
        {name}
        <i
          aria-hidden="true"
          className={`pull-right${hidden ? " hidden" : " revealed"}`}
        >
          <FontAwesomeIcon
            onClick={removeItem}
            icon={faTrash}
            style={{ color: done ? secondFontColor : fontColor }}
          />
        </i>
      </div>
    </li>
  );
};
