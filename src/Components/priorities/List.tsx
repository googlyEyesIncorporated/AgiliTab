import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectVisualSettings } from "../../features/general/settingsSlice";
import { ReplaceList } from "../../features/general/types";
import { DragAndDrop, ListItem } from "./ListItem";
import { Options } from "./PriorityActions";

interface ListProps extends ReplaceList {
  dragAndDrop: DragAndDrop;
}

export const List = ({ itemList, listKey, dragAndDrop }: ListProps) => {
  const [shouldShowOptions, setShouldShowOptions] = useState(false);
  const { secondFontColor } = useAppSelector(selectVisualSettings);

  const toggleOptions = () => {
    setShouldShowOptions(!shouldShowOptions);
  };
  const { ...restDND } = dragAndDrop;

  const ListItems = !Array.isArray(itemList)
    ? null
    : itemList.map((props, index, list) => (
        <ListItem
          {...props}
          done={props.done}
          index={index}
          key={props.id}
          listKey={listKey}
          dragAndDrop={restDND}
        />
      ));

  return (
    <div className="list">
      <div
        className="list-scrollable"
        onDragEnter={() => dragAndDrop.enterList(listKey)}
      >
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
