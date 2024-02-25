import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectAllLists,
  updateList,
} from "../../features/itemList/itemListSlice";
import { DraggableData, DraggableLists } from "./list/DraggableLists";
import { ListGroup } from "./list/Group";

export const BottomRow = () => {
  const lists = useAppSelector(selectAllLists);
  const dispatch = useAppDispatch();
  const callback = useCallback(
    ({ to, from }: { from?: DraggableData; to?: DraggableData }) => {
      if (from) {
        dispatch(updateList({ listKey: from.key, itemList: from.list }));
        if (to && from.key !== to?.key) {
          dispatch(updateList({ listKey: to.key, itemList: to.list }));
        }
      }
    },
    [dispatch]
  );

  if (!Object.keys(lists).length) {
    return null;
  }

  return (
    <div
      data-testid="bottom-row"
      className="flex justify-evenly lg:h-1/2 h-auto flex-wrap"
    >
      <DraggableLists lists={lists} callback={callback}>
        {Object.keys(lists).map((key) => {
          return (
            <ListGroup key={key} {...lists[key]} listKey={key} groupId={key} />
          );
        })}
      </DraggableLists>
    </div>
  );
};
