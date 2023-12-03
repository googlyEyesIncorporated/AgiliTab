import {
  ItemList,
  StartEndUnitType,
  ListKey,
} from "../../../features/itemList/types";
import { DragAndDrop } from "./item/DumbListItem";
import { List } from "./List";
import { ElapsedTime } from "../../atoms/ElapsedTime";
import Icon from "../../atoms/Icon";
import { useState } from "react";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";

const createNameList = (list: ListGroupProps["list"]) =>
  list.map((item) => item.name);

const copyListToClipboard = (list: ListGroupProps["list"]) => {
  const itemList = createNameList(list).join("\r\n");
  navigator.clipboard.writeText(itemList);
};
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
  const [hideIcon, setHideIcon] = useState(true);
  const iconShowOrHide = hideIcon ? " hidden" : " revealed";

  return (
    <div className="priorities">
      <div
        className="priorities-title"
        onMouseEnter={() => setHideIcon(false)}
        onMouseLeave={() => setHideIcon(true)}
      >
        <div style={{ minWidth: "2rem", display: "inline-block" }}>
          <Icon
            onClick={() => copyListToClipboard(list)}
            icon={faCopy}
            faStyle={{}}
            iconClassName={`trashcan  mr-2${iconShowOrHide}`}
          />
        </div>
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
