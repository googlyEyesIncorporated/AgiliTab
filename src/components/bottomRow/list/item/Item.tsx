import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectVisualSettings } from "../../../../features/settings/settingsSlice";
import {
  remove,
  toggleChecked,
  updateListItem,
} from "../../../../features/itemList/itemListSlice";
import { EditBox } from "./Editbox";
import { DumbListItem, ListItemProps } from "./DumbListItem";

const copyItem = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const SmartListItem = ({
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
  return editBoxIsHidden ? (
    <DumbListItem
      closeAndSaveInput={closeAndSaveInput}
      done={done}
      id={id}
      removeItem={removeItem}
      copyItem={copyItem}
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
    />
  ) : (
    <EditBox
      inputRef={inputRef}
      name={name}
      fontColor={fontColor}
      bgColor={bgColor}
      index={index}
      closeAndSaveInput={closeAndSaveInput}
    />
  );
};
