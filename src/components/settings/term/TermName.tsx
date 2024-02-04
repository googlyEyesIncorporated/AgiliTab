import React from "react";

interface TermNameProps {
  groupId: number;
  title: string;
  enabled: boolean;
  setTitle: (value: React.SetStateAction<string>) => void;
  onChange: (changed: any) => void;
}
export const TermName = ({
  groupId,
  title,
  enabled,
  setTitle,
  onChange,
}: TermNameProps) => {
  const groupIdName = `group-${groupId}-unit-name`;
  return (
    <div className="inline-block">
      <label className="inline-block w-[61px]" htmlFor={groupIdName}>
        Name:{" "}
      </label>
      <input
        id={groupIdName}
        data-testid={groupIdName}
        name={groupIdName}
        type="text"
        value={title}
        disabled={!enabled}
        className="p-0 w-[107px]"
        onChange={(e) => {
          if (enabled) {
            const title = e.target.value;
            const unitType = title.toLowerCase();
            setTitle(title);
            onChange({ title, unitType });
          }
        }}
      />
    </div>
  );
};
