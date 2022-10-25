import React, { useState } from "react";
import { ItemList, ListKey, ListProps } from "../../types";
import { ListItem } from "./ListItem";
import { Options } from "./PriorityActions";

export const List = ({
  listItems,
  listKey,
}: {
  listItems: ItemList;
  listKey: ListKey;
}) => {
  const [shouldShowOptions, setShouldShowOptions] = useState(false);

  const toggleOptions = () => {
    setShouldShowOptions(!shouldShowOptions);
  };

  return (
    <div className="list">
      <div className="list-scrollable">
        <ul className="shown-items">
          {listItems.map((props, index, list) => (
            <ListItem
              {...props}
              done={props.done}
              index={index}
              key={props.id}
              listKey={listKey}
            />
          ))}
        </ul>
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
