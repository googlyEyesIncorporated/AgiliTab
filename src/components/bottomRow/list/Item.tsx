import { useCallback, useEffect, useRef, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectVisualSettings } from "../../../features/settings/settingsSlice";
import {
  remove,
  toggleChecked,
  updateListItem,
} from "../../../features/itemList/itemListSlice";
import {
  ListAndIndex,
  ListKey,
} from "../../../features/itemList/types";
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

interface TaskProps {
  fontColor: string;
  bgColor: string;
  name: string;
  inputRef: React.MutableRefObject<HTMLInputElement | null>
}

interface EditBoxProps extends TaskProps {
  closeAndSaveInput: (name: string) => void,
}

interface TaskItemProps extends EditBoxProps, ListItemProps {
  removeItem: () => void;
  secondFontColor: string;
  checkboxClick: () => void;
  setEditBoxIsHidden: React.Dispatch<React.SetStateAction<boolean>>
}

const EditBox = ({inputRef, name, fontColor, bgColor, closeAndSaveInput}: EditBoxProps) => {
  return (
    <li>
      <input
        ref={inputRef}
        type="text"
        defaultValue={name}
        style={{
          color: fontColor,
          backgroundColor: bgColor,
          borderColor: fontColor,
          width: "100%",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && inputRef.current) {
            closeAndSaveInput(inputRef.current.value);
          }
        }}
        className="todo-edit"
      />
    </li>
  )
}

const TaskItem = ({done, id, removeItem, name, secondFontColor, checkboxClick, fontColor, bgColor, setEditBoxIsHidden, listKey, index, inputRef, dragAndDrop: {
  dragStart = () => {},
  dragEnd = () => {},
  enterListItem = () => {},
} = {}}: TaskItemProps) => {
  const [trashCanIsHidden, setTrashCanIsHidden] = useState(true);

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
      onDoubleClick={() => {
        setEditBoxIsHidden(false);
        inputRef.current?.focus();
      }}
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
          iconClassName={`trashcan pull-right${
            trashCanIsHidden ? " hidden" : " revealed"
          }`}
        />
      </div>
    </li>
  )
}

export const ListItem = ({
  name,
  id,
  done = false,
  index,
  listKey,
  dragAndDrop,
}: ListItemProps) => {
  const dispatch = useAppDispatch();
  const [editBoxIsHidden, setEditBoxIsHidden] = useState(true);
  const { fontColor, secondFontColor, bgColor } =
    useAppSelector(selectVisualSettings);
  const checkboxClick = () => {
    dispatch(toggleChecked({ listKey, index }));
  };
  const inputRef: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);

  const closeAndSaveInput = useCallback(
    (name: string) => {
      dispatch(
        updateListItem({
          listKey,
          name,
          index,
        })
      );
      setEditBoxIsHidden(true);
    },
    [listKey, index, dispatch]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node | null)
      ) {
        closeAndSaveInput(inputRef.current.value);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [closeAndSaveInput]);

  const removeItem = () => {
    dispatch(remove({ listKey, index }));
  };
  return editBoxIsHidden ? 
  <TaskItem 
  closeAndSaveInput={closeAndSaveInput}
  done={done}
  id={id}
  removeItem={removeItem}
  name={name}
  secondFontColor={secondFontColor}
  checkboxClick={checkboxClick}
  fontColor={fontColor}
  bgColor={bgColor}
  setEditBoxIsHidden={setEditBoxIsHidden}
  listKey={listKey}
  index={index}
  inputRef={inputRef}
  dragAndDrop={dragAndDrop}
  /> : <EditBox inputRef={inputRef} name={name} fontColor={fontColor} bgColor={bgColor} closeAndSaveInput={closeAndSaveInput} />;
};
