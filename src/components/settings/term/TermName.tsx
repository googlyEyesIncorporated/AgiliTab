import React from "react";

interface TermNameProps {
  groupId: number;
  title: string;
  enabled: boolean;
  setTitle: (value: React.SetStateAction<string>) => void;
  setUnitType: (value: React.SetStateAction<string>) => void;
}
export const TermName = ({
  groupId,
  title,
  enabled,
  setTitle,
  setUnitType,
}: TermNameProps) => {
  const groupIdName = `group-${groupId}-unit-name`;
  return (
    <div className="inline-block w-1/2">
      <label htmlFor={groupIdName}>Name: </label>
      <input
        id={groupIdName}
        data-testid={groupIdName}
        name={groupIdName}
        type="text"
        value={title}
        disabled={!enabled}
        className="pt-2 pb-0 pl-1 h-6 w-36"
        onChange={(e) => {
          if (enabled) {
            setTitle(e.target.value);
            setUnitType(e.target.value.toLowerCase());
          }
        }}
        style={{
          backgroundColor: enabled ? "white" : "darkgray",
          lineHeight: 3,
        }}
      />
    </div>
  );
};
