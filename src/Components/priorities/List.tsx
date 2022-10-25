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

  const optionsClick = () => {
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
        <a
          href="#"
          className="edit-priorities-link shadow-color"
          onClick={optionsClick}
        >
          Options
        </a>
        <Options shouldShowOptions={shouldShowOptions} />
      </div>
    </div>
  );
};
