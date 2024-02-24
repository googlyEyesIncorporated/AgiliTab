import { ItemList, ListKey } from "../../../features/itemList/types";
import { StartAndEnd } from "../../../app/commonTypes";
import { DragAndDrop } from "./item/DumbListItem";
import { List } from "./List";
import { ElapsedTime } from "../../atoms/ElapsedTime";
import Icon from "../../atoms/Icon";
import { useRef, useState } from "react";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import { faGears } from "@fortawesome/free-solid-svg-icons/faGears";
import { ColumnSettings } from "../../settings/ColumnSettings";
import { DurationObj } from "../../../features/itemList/types";
import { Duration, EndDate } from "../utils/getCurrentRatio";

const copyListToClipboard = (list: ListGroupProps["list"]) => {
  const itemList = list.map((item) => item.name).join("\r\n");
  navigator.clipboard.writeText(itemList);
};
export const ListGroup = ({
  title,
  list,
  dragAndDrop,
  listKey,
  groupId,
  ...term
}: ListGroupProps) => {
  const [iconVisibility, setIconVisibility] = useState("hidden");
  const [hideSettings, setHideSettings] = useState(true);
  const settingsContainer = useRef(null as HTMLDivElement | null);

  return (
    <div
      className="fade-in-up-1s align-top m-2 w-full lg:w-3/10 inline-block"
      data-testid="group-container"
    >
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
        <div className="absolute left-0">
          <div
            className="inline-block"
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
          <div className="inline-block" data-testid={`group-${groupId}-copy`}>
            <Icon
              onClick={() => copyListToClipboard(list)}
              icon={faCopy}
              iconClassName={`cursor-pointer mr-2 ${iconVisibility}`}
            />
          </div>
        </div>
        <span
          data-testid={`group-${groupId}-title`}
          className="text-[1.6875rem]"
        >
          {title}
        </span>
        {term && (
          <ElapsedTime
            className="text-[1.6875rem]"
            term={term as EndDate | Duration<DurationObj>}
            groupId={groupId}
          />
        )}
      </div>
      {hideSettings ? (
        <List
          groupId={groupId}
          itemList={list}
          listKey={listKey}
          dragAndDrop={dragAndDrop}
        />
      ) : (
        <div data-testid="column-settings" ref={settingsContainer}>
          <ColumnSettings
            settingsContainer={settingsContainer}
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
  listKey: string;
  startDate?: string;
  endDate?: string;
  duration?: DurationObj;
  groupId: string;
}

type CastedTerm = {
  startDate: string;
  endDate?: string | undefined;
  duration?: DurationObj | undefined;
};
