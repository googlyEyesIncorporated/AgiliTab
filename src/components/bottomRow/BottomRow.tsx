import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  moveTerm,
  selectAllLists,
  selectListOrder,
  updateList,
} from "../../features/itemList/itemListSlice";
import { DraggableData, DraggableLists } from "./list/DraggableLists";
import { ListGroup } from "./list/Group";

export const BottomRow = () => {
  const lists = useAppSelector(selectAllLists);
  const listOrder = useAppSelector(selectListOrder);
  const dispatch = useAppDispatch();
  const getListItem = (key: string) => lists[key].list;
  const getList = () => listOrder;

  const moveListItem = useCallback(
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
  const moveListPosition = useCallback(
    ({ from }: { from?: DraggableData }) => {
      if (from?.list) {
        dispatch(moveTerm({ listOrder: from.list }));
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
      className="flex justify-evenly lg:h-1/2 h-auto flex-wrap bg-inherit"
    >
      <DraggableLists
        getList={getList}
        lists={listOrder}
        callback={moveListPosition}
      >
        <DraggableLists
          lists={lists}
          getList={getListItem}
          callback={moveListItem}
        >
          {listOrder.map((key, index) => {
            return (
              <ListGroup
                index={index}
                key={key}
                {...lists[key]}
                listKey={key}
                groupId={key}
              />
            );
          })}
        </DraggableLists>
      </DraggableLists>
    </div>
  );
};
