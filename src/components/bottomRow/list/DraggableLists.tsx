import React, { useRef, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { updateList } from "../../../features/itemList/itemListSlice";
import {
  ListAndIndex,
  ListKey,
  ObjectOfLists,
} from "../../../features/itemList/types";

export const DraggableLists = ({
  lists,
  children,
}: React.PropsWithChildren<{
  lists: ObjectOfLists;
}>) => {
  const dragFrom: React.MutableRefObject<null | ListAndIndex> = useRef(null);
  const dragTo: React.MutableRefObject<null | ListAndIndex> = useRef(null);
  const dispatch = useAppDispatch();
  const [itemBeingDragged, setItemBeingDragged] = useState<null | ListAndIndex>(
    null
  );
  const dragStart = (position: ListAndIndex) => {
    dragFrom.current = position;
    setItemBeingDragged(position);
  };

  const enterListItem = (position: ListAndIndex) => {
    dragTo.current = position;
  };

  const enterList = (listKey: ListKey) => {
    if (dragTo.current?.listKey !== listKey) {
      dragTo.current = { listKey, index: 0 };
    }
  };

  const dragEnd = () => {
    if (dragFrom.current && dragTo.current) {
      const mutableLists = JSON.parse(JSON.stringify(lists));
      const { listKey: fromKey, index: fromIndex } = dragFrom.current;
      const { listKey: toKey, index: toIndex } = dragTo.current;
      const item = mutableLists[fromKey][fromIndex];
      mutableLists[fromKey].splice(fromIndex, 1);
      mutableLists[toKey].splice(toIndex, 0, item);
      dispatch(updateList({ listKey: toKey, itemList: mutableLists[toKey] }));
      dispatch(
        updateList({ listKey: fromKey, itemList: mutableLists[fromKey] })
      );
      dragTo.current = null;
      dragFrom.current = null;
    }
    setItemBeingDragged(null);
  };

  const dragAndDrop = {
    enterListItem,
    dragStart,
    dragEnd,
    enterList,
    itemBeingDragged,
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as React.ReactElement<any>, {
          dragAndDrop,
        });
      })}
    </>
  );
};
