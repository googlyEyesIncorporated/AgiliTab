import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { ReplaceList } from "../../../features/itemList/types";
import { selectVisualSettings } from "../../../features/settings/settingsSlice";
import { SmartListItem } from "./item/Item";
import { Options } from "./Options";
import { DragAndDrop } from "./item/DumbListItem";

interface ListProps extends ReplaceList {
  dragAndDrop?: DragAndDrop;
  groupId: number;
}

export const List = ({
  itemList,
  listKey,
  dragAndDrop,
  groupId,
}: ListProps) => {
  const { enterList = () => {} } = dragAndDrop ?? {};
  const [shouldShowOptions, setShouldShowOptions] = useState(false);
  const { secondFontColor } = useAppSelector(selectVisualSettings);

  const toggleOptions = () => {
    setShouldShowOptions(!shouldShowOptions);
  };

  const ListItems = !Array.isArray(itemList)
    ? null
    : itemList.map((props, index) => (
        <SmartListItem
          {...props}
          done={props.done}
          index={index}
          key={props.id}
          listKey={listKey}
          dragAndDrop={dragAndDrop}
        />
      ));

  return (
    <div className="list">
      <div
        data-testid={`group-${groupId}-list`}
        className="w-full overflow-auto max-h-60 lg:max-h-full overflow-x-hidden"
        onDragEnter={() => enterList(listKey)}
      >
        <ul className="text-left min-h-[0.5rem]">{ListItems}</ul>
        {!shouldShowOptions && (
          <button
            className="no-underline m-2 text-base block button-class float-right"
            data-testid={`${listKey}-edit-priorities-link`}
            onClick={toggleOptions}
            style={{ color: secondFontColor }}
          >
            Options
          </button>
        )}
        <Options
          groupId={groupId}
          shouldShowOptions={shouldShowOptions}
          toggleOptions={toggleOptions}
          listKey={listKey}
        />
      </div>
    </div>
  );
};
