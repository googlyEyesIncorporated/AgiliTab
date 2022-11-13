import { useRef } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectAllLists, updateList } from "../features/itemList/itemListSlice";
import { ListAndIndex, ListKey } from "../features/itemList/types";
import { selectAllUnits } from "../features/Settings/settingsSlice";
import { Column } from "./priorities/Column";

export const BottomRow = () => {
  const lists = useAppSelector(selectAllLists);
  const { shortTerm, mediumTerm, longTerm } = useAppSelector(selectAllUnits);
  const dragFrom: React.MutableRefObject<null | ListAndIndex> = useRef(null);
  const dragTo: React.MutableRefObject<null | ListAndIndex> = useRef(null);
  const dispatch = useAppDispatch();

  const dragStart = (position: ListAndIndex) => {
    dragFrom.current = position;
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
  };

  const dragAndDrop = {
    enterListItem,
    dragStart,
    dragEnd,
    enterList,
  };

  return (
    <div id="bottom-row">
      <Column
        title={shortTerm.title}
        itemList={lists.shortTermList}
        listKey="shortTermList"
        dragAndDrop={dragAndDrop}
      />
      <Column
        title={mediumTerm.title}
        itemList={lists.mediumTermList}
        listKey="mediumTermList"
        dragAndDrop={dragAndDrop}
      />
      <Column
        title={longTerm.title}
        itemList={lists.longTermList}
        listKey="longTermList"
        dragAndDrop={dragAndDrop}
      />
    </div>
  );
};
