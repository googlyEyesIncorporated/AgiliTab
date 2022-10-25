import React, { useEffect, useState } from "react";
import { ItemList, ListKey, UnitType } from "../../types";
import { List } from "./List";
export const Column = ({
  title,
  listItems,
  listKey,
}: Pick<UnitType, "title"> & { listItems: ItemList; listKey: ListKey }) => {
  return (
    <div className="priorities">
      <div className="priorities-title">{title}</div>
      <List listItems={listItems} listKey={listKey} />
    </div>
  );
};
