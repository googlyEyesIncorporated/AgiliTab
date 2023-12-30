import React from "react";

interface TermNameProps {
  groupId: number;
  title: string;
  enabled: boolean;
  setTitle: (value: React.SetStateAction<string>) => void;
  setUnitType: (value: React.SetStateAction<string>) => void;
  onChange: (changed: any) => void;
}
export const TermName = ({
  groupId,
  title,
  enabled,
  setTitle,
  setUnitType,
  onChange,
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
            const title = e.target.value;
            const unitType = title.toLowerCase();
            setTitle(title);
            setUnitType(unitType);
            onChange({ title, unitType });
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
