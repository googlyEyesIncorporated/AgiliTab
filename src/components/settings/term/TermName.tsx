import React from "react";

interface TermNameProps {
  groupId: number;
  title: string;
  enabled?: boolean;
  onChange: (changed: any) => void;
}
export const TermName = ({
  groupId,
  title,
  enabled = true,
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
            onChange({ title: e.target.value });
          }
        }}
      />
    </div>
  );
};
