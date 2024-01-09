import {
  ItemList,
  StartEndUnitType,
  ListKey,
} from "../../../features/itemList/types";
import { DragAndDrop } from "./item/DumbListItem";
import { List } from "./List";
import { ElapsedTime } from "../../atoms/ElapsedTime";
import Icon from "../../atoms/Icon";
import { useRef, useState } from "react";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import { faGears } from "@fortawesome/free-solid-svg-icons/faGears";
import { ColumnSettings } from "../../settings/ColumnSettings";
import { AdvanceTerm } from "../../atoms/AdvanceTerm";

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
  isScopedToWorkingHours,
  groupId,
}: ListGroupProps) => {
  const [hideIcon, setHideIcon] = useState(true);
  const [hideSettings, setHideSettings] = useState(true);
  const iconShowOrHide = hideIcon ? " hidden" : " fade-in-1s";
  const settingsContainer = useRef(null as HTMLDivElement | null);

  return (
    <div className="fade-in-up-1s align-top m-2 w-full lg:w-3/10 inline-block">
      <div
        className={`pb-1 text-2xl border-current text-center${
          hideSettings ? " border-b" : ""
        }`}
        role="columnheader"
        tabIndex={0}
        data-testid={`group-${groupId}-header`}
        onMouseEnter={() => setHideIcon(false)}
        onMouseLeave={() => setHideIcon(true)}
      >
        <div
          className="min-w-10 inline-block"
          data-testid={`group-${groupId}-settings`}
        >
          <Icon
            onClick={(e) => {
              e.stopPropagation();
              setHideSettings(!hideSettings);
            }}
            icon={faGears}
            iconClassName={`cursor-pointer mr-2${iconShowOrHide}`}
          />
        </div>
        <div className="min-w-8 inline-block">
          <Icon
            onClick={() => copyListToClipboard(list)}
            icon={faCopy}
            iconClassName={`cursor-pointer mr-2${iconShowOrHide}`}
          />
        </div>
        <span
          data-testid={`group-${groupId}-title`}
          className="text-[1.6875rem]"
        >
          {title}
        </span>
        <AdvanceTerm
          setTerm={setTerm}
          isScopedToWorkingHours={isScopedToWorkingHours}
          term={term}
        >
          <ElapsedTime
            className="text-[1.6875rem]"
            term={term}
            groupId={groupId}
            isScopedToWorkingHours={isScopedToWorkingHours}
          />
        </AdvanceTerm>
      </div>
      {hideSettings ? (
        <List itemList={list} listKey={listKey} dragAndDrop={dragAndDrop} />
      ) : (
        <div data-testid="column-settings" ref={settingsContainer}>
          <ColumnSettings
            settingsContainer={settingsContainer}
            hideSettings={hideSettings}
            setHideSettings={setHideSettings}
            groupId={groupId}
          />
        </div>
      )}
    </div>
  );
};

interface ListGroupProps {
  title: string;
  list: ItemList;
  dragAndDrop?: DragAndDrop;
  listKey: ListKey;
  term: StartEndUnitType;
  setTerm: React.Dispatch<React.SetStateAction<StartEndUnitType>>;
  isScopedToWorkingHours?: boolean;
  groupId: number;
}
