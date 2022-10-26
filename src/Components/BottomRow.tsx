import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllLists, updateList } from "../features/counter/itemListSlice";
import { selectAllUnits } from "../features/counter/unitsSlice";
import { ListKey, Position } from "../types";
import { Column } from "./priorities/Column";

export const BottomRow = () => {
  const lists = useSelector(selectAllLists);
  const { firstUnit, secondUnit, thirdUnit } = useSelector(selectAllUnits);
  const dragFrom: React.MutableRefObject<null | Position> = useRef(null);
  const dragTo: React.MutableRefObject<null | Position> = useRef(null);
  const dispatch = useDispatch();

  const dragStart = (position: Position) => {
    dragFrom.current = position;
    console.log("dragStart", position);
  };

  const enterListItem = (position: Position) => {
    dragTo.current = position;
    console.log("enterListItem", position);
  };

  const enterList = (listKey: ListKey) => {
    if (dragTo.current?.key !== listKey) {
      dragTo.current = { key: listKey, index: 0 };
      console.log("enterList", listKey);
    }
  };

  const dragEnd = () => {
    if (dragFrom.current && dragTo.current) {
      const mutableLists = JSON.parse(JSON.stringify(lists));
      const { key: fromKey, index: fromIndex } = dragFrom.current;
      const { key: toKey, index: toIndex } = dragTo.current;
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
        title={firstUnit.title}
        itemList={lists.firstList}
        listKey="firstList"
        dragAndDrop={dragAndDrop}
      />
      <Column
        title={secondUnit.title}
        itemList={lists.secondList}
        listKey="secondList"
        dragAndDrop={dragAndDrop}
      />
      <Column
        title={thirdUnit.title}
        itemList={lists.thirdList}
        listKey="thirdList"
        dragAndDrop={dragAndDrop}
      />
    </div>
  );
};
