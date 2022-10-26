import { ColumnProps } from "../../types";
import { List } from "./List";
export const Column = ({ title, ...restProps }: ColumnProps) => {
  return (
    <div className="priorities">
      <div className="priorities-title">{title}</div>
      <List {...restProps} />
    </div>
  );
};
