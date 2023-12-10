import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import Icon from "../../../atoms/Icon";
import CheckBox from "../../../atoms/CheckBox";
import React, { useState } from "react";
import { ListAndIndex, ListKey } from "../../../../features/itemList/types";
import { EditBox } from "./Editbox";

const itemBeingDraggedCurrentItem = (
  { listKey, index }: ListAndIndex,
  itemBeingDragged?: ListAndIndex
) => itemBeingDragged?.listKey === listKey && itemBeingDragged.index === index;

export const DumbListItem = ({
  done,
  id,
  removeItem,
  copyItem,
  name,
  secondFontColor,
  checkboxClick,
  fontColor,
  bgColor,
  setEditBoxIsHidden,
  listKey,
  index,
  inputRef,
  dragAndDrop: {
    dragStart = () => {},
    dragEnd = () => {},
    enterListItem = () => {},
    itemBeingDragged,
  } = {},
}: DumbListItemProps) => {
  const [hideIcon, setHideIcon] = useState(true);
  const iconShowOrHide = hideIcon ? " hidden" : " fade-in-1s";
  const iconColor = done ? secondFontColor : fontColor;
  return (
    <li
      className={`flex p-2 border leading-none items-center${
        itemBeingDraggedCurrentItem({ listKey, index }, itemBeingDragged)
          ? " opacity-5" // There's got to be a better way, find it later.
          : ""
      }`}
      style={{
        color: done ? secondFontColor : fontColor,
        borderColor: done ? secondFontColor : fontColor,
        backgroundColor: bgColor,
      }}
      onMouseEnter={() => setHideIcon(false)}
      onMouseLeave={() => setHideIcon(true)}
      draggable
      onDragStart={() => dragStart({ listKey, index })}
      onDragEnter={() => enterListItem({ listKey, index })}
      onDragEnd={() => dragEnd()}
      onDoubleClick={() => {
        setEditBoxIsHidden(false);
        inputRef.current?.focus();
      }}
      data-testid={`list-item-${index}`}
    >
      <div className="list-item-checkbox relative">
        <CheckBox
          onChange={checkboxClick}
          checked={done}
          nameId={id}
          labelText=""
          labelClass="mr-2 w-4 h-4 left-0 border border-current rounded-sm top-[12.5%] after:opacity-0 after:left-0 after:text-2xl after:leading-none after:content-['✔'] after:top-[-0.5rem] after:font-['FontAwesome'] hover:after:opacity-[0.3]"
          className="absolute"
          data-testid={`list-item-checkbox-${index}`}
          inputStyle={{ color: secondFontColor }}
        />
      </div>
      <div
        className={`grow${done ? " line-through" : ""}`}
        data-testid="todo-text"
      >
        {name}
        <Icon
          onClick={removeItem}
          icon={faTrash}
          faStyle={{ color: iconColor }}
          iconClassName={`cursor-pointer float-right ml-2${iconShowOrHide}`}
          data-testid={`list-item-delete-${index}`}
        />
        <Icon
          onClick={() => copyItem(name)}
          icon={faCopy}
          faStyle={{ color: iconColor }}
          iconClassName={`cursor-pointer float-right ml-2${iconShowOrHide}`}
          data-testid={`list-item-copy-${index}`}
        />
      </div>
    </li>
  );
};

export interface DragAndDrop {
  enterListItem?: (position: ListAndIndex) => void;
  dragStart?: (position: ListAndIndex) => void;
  dragEnd?: () => void;
  enterList?: (listKey: ListKey) => void;
  itemBeingDragged?: ListAndIndex;
}

export type ListItemProps = {
  name: string;
  done: boolean;
  id: string;
  index: number;
  listKey: ListKey;
  dragAndDrop?: DragAndDrop;
};

interface DumbListItemProps
  extends React.ComponentProps<typeof EditBox>,
    ListItemProps {
  removeItem: () => void;
  copyItem: (text: string) => void;
  secondFontColor: string;
  checkboxClick: () => void;
  setEditBoxIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
}
