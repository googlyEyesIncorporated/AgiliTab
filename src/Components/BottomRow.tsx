import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ListAndIndex,
  selectAllLists,
  updateList,
} from "../features/general/itemListSlice";
import { selectAllUnits } from "../features/general/settingsSlice";
import { ListKey } from "../features/general/storageHelper";
import { Column } from "./priorities/Column";

export const BottomRow = () => {
  const lists = useSelector(selectAllLists);
  const { shortTerm, mediumTerm, longTerm } = useSelector(selectAllUnits);
  const dragFrom: React.MutableRefObject<null | ListAndIndex> = useRef(null);
  const dragTo: React.MutableRefObject<null | ListAndIndex> = useRef(null);
  const dispatch = useDispatch();

  const dragStart = (position: ListAndIndex) => {
    dragFrom.current = position;
    console.log("dragStart", position);
  };

  const enterListItem = (position: ListAndIndex) => {
    dragTo.current = position;
    console.log("enterListItem", position);
  };

  const enterList = (listKey: ListKey) => {
    if (dragTo.current?.listKey !== listKey) {
      dragTo.current = { listKey, index: 0 };
      console.log("enterList", listKey);
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
      console.log("drop", lists);
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
