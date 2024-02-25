import React, { useRef, useState } from "react";

export const DraggableLists = ({
  lists,
  callback,
  children,
}: React.PropsWithChildren<{
  lists: Record<string | number | symbol, any>;
  callback: (dragData: { from?: DraggableData; to?: DraggableData }) => void;
}>) => {
  const dragFrom: React.MutableRefObject<null | ListAndIndex> = useRef(null);
  const dragTo: React.MutableRefObject<null | ListAndIndex> = useRef(null);
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

  const dragEnd = () => {
    if (dragFrom.current && dragTo.current) {
      const { listKey: fromKey, index: fromIndex } = dragFrom.current;
      const { listKey: toKey, index: toIndex } = dragTo.current;
      const isSameList = fromKey === toKey;

      const fromList = [...lists[fromKey].list];
      const item = lists[fromKey].list[fromIndex];
      const toList = isSameList ? fromList : [...lists[toKey].list];

      fromList.splice(fromIndex, 1);
      toList.splice(toIndex, 0, item);

      callback({
        from: { list: fromList, key: fromKey },
        to: { list: toList, key: toKey },
      });
      dragTo.current = null;
      dragFrom.current = null;
    }
    setItemBeingDragged(null);
  };

  const dragAndDrop = {
    enterListItem,
    dragStart,
    dragEnd,
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

export interface ListAndIndex {
  listKey: string;
  index: number;
}

export interface DraggableData {
  list: any[];
  key: string;
}
