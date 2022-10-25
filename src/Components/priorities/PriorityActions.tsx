import React, { SyntheticEvent } from "react";

const addClick = (event: SyntheticEvent) => {
  event.stopPropagation();
  event.preventDefault();
};

export const Options = ({ section = "", shouldShowOptions = false }) => {
  return (
    <div className={`edit-priorities${shouldShowOptions ? "" : " hidden"}`}>
      <form id={`todo-form-${section}`}>
        <input type="text" className="todo main-bgcolor main-font-color" />
        <input
          type="submit"
          id="submit"
          value="Add"
          onClick={addClick}
          className="add-item-button main-font-color"
        />
      </form>
      <a href="#"></a>
    </div>
  );
};
