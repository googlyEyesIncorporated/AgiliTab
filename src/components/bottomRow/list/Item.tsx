import { useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectVisualSettings } from "../../../features/settings/settingsSlice";
import {
  remove,
  toggleChecked,
} from "../../../features/itemList/itemListSlice";
import { ListAndIndex, ListKey } from "../../../features/itemList/types";
import CheckBox from "../../atoms/CheckBox";
import Icon from "../../atoms/Icon";

export interface DragAndDrop {
  enterListItem?: (position: ListAndIndex) => void;
  dragStart?: (position: ListAndIndex) => void;
  dragEnd?: () => void;
  enterList?: (listKey: ListKey) => void;
}

type ListItemProps = {
  name: string;
  done: boolean;
  id: string;
  index: number;
  listKey: ListKey;
  dragAndDrop?: DragAndDrop;
};

export const ListItem = ({
  name,
  id,
  done = false,
  index,
  listKey,
  dragAndDrop: {
    dragStart = () => {},
    dragEnd = () => {},
    enterListItem = () => {},
  } = {},
}: ListItemProps) => {
  const dispatch = useAppDispatch();
  const [trashCanIsHidden, setTrashCanIsHidden] = useState(true);
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
      onMouseEnter={() => setTrashCanIsHidden(false)}
      onMouseLeave={() => setTrashCanIsHidden(true)}
      draggable
      onDragStart={() => dragStart({ listKey, index })}
      onDragEnter={() => enterListItem({ listKey, index })}
      onDragEnd={() => dragEnd()}
    >
      <div className="squaredThree">
        <CheckBox
          onChange={checkboxClick}
          checked={done}
          nameId={id}
          labelText=""
          inputStyle={{ color: secondFontColor }}
        />
      </div>
      <div className={`todo-text${done ? " todo-card-done" : ""}`}>
        {name}
        <Icon
          onClick={removeItem}
          icon={faTrash}
          faStyle={{ color: done ? secondFontColor : fontColor }}
          iconClassName={`pull-right${
            trashCanIsHidden ? " hidden" : " revealed"
          }`}
        />
      </div>
    </li>
  );
};
