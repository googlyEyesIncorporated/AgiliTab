import { useState } from "react";
import { ColumnProps } from "../../types";
import { ListItem } from "./ListItem";
import { Options } from "./PriorityActions";

export const List = ({
  itemList,
  listKey,
  dragAndDrop,
}: Omit<ColumnProps, "title">) => {
  const [shouldShowOptions, setShouldShowOptions] = useState(false);

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
          <a
            href="#"
            className="edit-priorities-link shadow-color"
            onClick={toggleOptions}
          >
            Options
          </a>
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
