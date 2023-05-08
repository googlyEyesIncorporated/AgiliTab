import { ItemList, StartEndUnitType } from "../../../features/itemList/types";
import { DragAndDrop } from "./Item";
import { List } from "./List";
import { ElapsedTime } from "../../Atoms/ElapsedTime";
import { ListKey } from "../../../features/itemList/types";

interface ListGroupProps {
  title: string;
  list: ItemList;
  dragAndDrop?: DragAndDrop;
  listKey: ListKey;
  term?: StartEndUnitType;
  setTerm: React.Dispatch<React.SetStateAction<StartEndUnitType>>;
  advanceTerm: (...props: any) => void;
  isScopedToWorkingHours?: boolean;
}

export const ListGroup = ({
  title,
  term,
  setTerm,
  list,
  dragAndDrop,
  listKey,
  advanceTerm,
  isScopedToWorkingHours,
}: ListGroupProps) => {
  return (
    <div className="priorities">
      <div className="priorities-title">
        <span>{title}</span>
        <ElapsedTime
          term={term}
          setTerm={setTerm}
          advanceTerm={advanceTerm}
          isScopedToWorkingHours={isScopedToWorkingHours}
        />
      </div>
      <List itemList={list} listKey={listKey} dragAndDrop={dragAndDrop} />
    </div>
  );
};
