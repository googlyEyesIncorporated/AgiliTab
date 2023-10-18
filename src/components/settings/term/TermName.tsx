import React from "react";

interface TermNameProps {
  category: string;
  title: string;
  enabled: boolean;
  setTitle: (value: React.SetStateAction<string>) => void;
  setUnitType: (value: React.SetStateAction<string>) => void;
}
export const TermName = ({
  category,
  title,
  enabled,
  setTitle,
  setUnitType,
}: TermNameProps) => {
  const categoryName = `${category}-unit-name`;
  return (
    <div style={{ display: "inline-block", width: "50%" }}>
      <label htmlFor={categoryName}>Name: </label>
      <input
        id={categoryName}
        name={categoryName}
        type="text"
        value={title}
        disabled={enabled ? false : true}
        onChange={(e) => {
          if (enabled) {
            setTitle(e.target.value);
            setUnitType(e.target.value.toLowerCase());
          }
        }}
        style={{
          width: "10rem",
          height: "1.1875rem",
          backgroundColor: enabled ? "ButtonFace" : "darkgray",
        }}
      />
    </div>
  );
};
