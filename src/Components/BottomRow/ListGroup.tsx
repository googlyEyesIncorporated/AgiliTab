import {
  ItemList,
  ItemListState,
  StartEndUnitType,
} from "../../features/itemList/types";
import { DragAndDrop } from "./ListItem";
import { List } from "./List";
import { ElapsedTime } from "./ElapsedTime";

interface ListGroupProps {
  title: string;
  list: ItemList;
  dragAndDrop?: DragAndDrop;
  listKey: keyof ItemListState;
  term?: StartEndUnitType;
  setTerm: React.Dispatch<React.SetStateAction<StartEndUnitType>>;
  advanceTerm: (...props: any) => void;
}

export const ListGroup = ({
  title,
  term,
  setTerm,
  list,
  dragAndDrop,
  listKey,
  advanceTerm,
}: ListGroupProps) => {
  return (
    <div className="priorities">
      <div className="priorities-title">
        <span>{title}</span>
        <ElapsedTime term={term} setTerm={setTerm} advanceTerm={advanceTerm} />
      </div>
      <List itemList={list} listKey={listKey} dragAndDrop={dragAndDrop} />
    </div>
  );
};
