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

const createNameList = (list: ListGroupProps["list"]) =>
  list.map((item) => item.name);

const copyListToClipboard = (list: ListGroupProps["list"]) => {
  const itemList = createNameList(list).join("\r\n");
  navigator.clipboard.writeText(itemList);
};
export const ListGroup = ({
  title,
  term,
  list,
  dragAndDrop,
  listKey,
  isScopedToWorkingHours,
  groupId,
}: ListGroupProps) => {
  const [iconVisibility, setIconVisibility] = useState("hidden");
  const [hideSettings, setHideSettings] = useState(true);
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
        onMouseEnter={() => setIconVisibility("fade-in-1s")}
        onMouseLeave={() => setIconVisibility("hidden")}
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
            iconClassName={`cursor-pointer mr-2 ${iconVisibility}`}
          />
        </div>
        <div className="min-w-8 inline-block">
          <Icon
            onClick={() => copyListToClipboard(list)}
            icon={faCopy}
            iconClassName={`cursor-pointer mr-2 ${iconVisibility}`}
          />
        </div>
        <span
          data-testid={`group-${groupId}-title`}
          className="text-[1.6875rem]"
        >
          {title}
        </span>
        <ElapsedTime
          className="text-[1.6875rem]"
          term={term}
          groupId={groupId}
          isScopedToWorkingHours={isScopedToWorkingHours}
        />
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
  isScopedToWorkingHours?: boolean;
  groupId: number;
}
