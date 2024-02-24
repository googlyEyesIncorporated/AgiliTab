import {
  CommonUnitTypeProps,
  ListTypes,
  UnitType,
  UnitTypeWithDuration,
  UnitTypeWithoutDuration,
  UnitTypes,
} from "../../features/itemList/types";
import { Duration } from "./term/Duration";
import { SelectDate } from "./term/SelectDate";

interface TimeFrameSelectionProps<T extends UnitTypes> {
  groupId: string;
  onChange: (termPart: Partial<UnitType<T>>) => void;
  termData: ListTypes;
}

export const TimeFrameSelection = <T extends UnitTypes>({
  groupId,
  onChange,
  termData,
}: TimeFrameSelectionProps<T>) => {
  if (termData.type === "none") {
    return null;
  }

  return (
    <>
      <div
        data-testid={`group-${groupId}-beginning-frame`}
        className="inline-block mb-1 inline-block min-w-[10.5rem] ml-2"
      >
        <SelectDate
          title="Beginning"
          groupId={groupId}
          date={termData.startDate}
          onChange={onChange}
        />
      </div>
      <div
        data-testid={`group-${groupId}-end-frame`}
        className="inline-block mb-1 inline-block min-w-[10.5rem] ml-2"
      >
        {termData.type === "duration" ? (
          <Duration
            duration={termData.duration}
            groupId={groupId}
            onChange={onChange}
          />
        ) : (
          <SelectDate
            title="End"
            groupId={groupId}
            date={termData.endDate}
            min={termData.startDate}
            onChange={onChange}
          />
        )}
      </div>
    </>
  );
};
