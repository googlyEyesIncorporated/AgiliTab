import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { ReplaceList } from "../../../features/itemList/types";
import { selectVisualSettings } from "../../../features/settings/settingsSlice";
import { SmartListItem } from "./item/Item";
import { Options } from "./Options";
import { DragAndDrop } from "./item/DumbListItem";

interface ListProps extends ReplaceList {
  dragAndDrop?: DragAndDrop;
}

export const List = ({ itemList, listKey, dragAndDrop }: ListProps) => {
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
      <div className="list-scrollable" onDragEnter={() => enterList(listKey)}>
        <ul className="shown-items">{ListItems}</ul>
        {!shouldShowOptions && (
          <button
            className="edit-priorities-link button-class pull-right"
            onClick={toggleOptions}
            style={{ color: secondFontColor }}
          >
            Options
          </button>
        )}
        <Options
          shouldShowOptions={shouldShowOptions}
          toggleOptions={toggleOptions}
          listKey={listKey}
        />
      </div>
    </div>
  );
};
