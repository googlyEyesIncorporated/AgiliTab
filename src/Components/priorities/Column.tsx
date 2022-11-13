import { ReplaceList } from "../../features/itemList/types";
import { Title } from "../../features/Settings/types";
import { List } from "./List";
import { DragAndDrop } from "./ListItem";
interface ColumnProps extends ReplaceList {
  title: Title;
  dragAndDrop: DragAndDrop;
}

export const Column = ({ title, ...restProps }: ColumnProps) => {
  return (
    <div className="priorities">
      <div className="priorities-title">{title}</div>
      <List {...restProps} />
    </div>
  );
};
