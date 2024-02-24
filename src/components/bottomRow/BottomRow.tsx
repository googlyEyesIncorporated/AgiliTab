import { useAppSelector } from "../../app/hooks";
import { selectAllLists } from "../../features/itemList/itemListSlice";
import { DraggableLists } from "./list/DraggableLists";
import { ListGroup } from "./list/Group";

export const BottomRow = () => {
  const lists = useAppSelector(selectAllLists);

  return (
    <div
      data-testid="bottom-row"
      className="flex justify-evenly lg:h-1/2 h-auto flex-wrap"
    >
      <DraggableLists lists={lists}>
        {Object.keys(lists).map((key) => {
          return (
            <ListGroup key={key} {...lists[key]} listKey={key} groupId={key} />
          );
        })}
      </DraggableLists>
    </div>
  );
};
