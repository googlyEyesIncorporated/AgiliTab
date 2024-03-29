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
  const iconShowOrHide = hideIcon ? " hidden" : " fade-in-1s";

  return (
    <div className="fade-in-up-1s align-top m-2 w-full lg:w-3/10 inline-block">
      <div
        className="pb-1 text-2xl border-b border-current text-center"
        onMouseEnter={() => setHideIcon(false)}
        onMouseLeave={() => setHideIcon(true)}
      >
        <div className="min-w-8 inline-block">
          <Icon
            onClick={() => copyListToClipboard(list)}
            icon={faCopy}
            iconClassName={`cursor-pointer  mr-2${iconShowOrHide}`}
          />
        </div>
        <span className="text-[1.6875rem]">{title}</span>
        <ElapsedTime
          className="text-[1.6875rem]"
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
