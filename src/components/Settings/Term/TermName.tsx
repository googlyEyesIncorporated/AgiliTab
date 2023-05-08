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
  return (
    <div style={{ display: "inline-block", width: "50%" }}>
      <label htmlFor={`${category}-unit-name`}>Name: </label>
      <input
        id="date-unit-name"
        name={`${category}-unit-name`}
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
