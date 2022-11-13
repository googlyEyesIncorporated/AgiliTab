import { ChangeEvent } from "react";

export type DurationOrDate = "duration" | "date";

interface RadioButtonProps {
  enabled: boolean;
  category: string;
  isDuration: boolean;
  setIsDuration: React.Dispatch<React.SetStateAction<boolean>>;
}

const RadioButton = ({
  enabled,
  category,
  isDuration,
  setIsDuration,
}: RadioButtonProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const duration = e.currentTarget.value === "duration" ? true : false;
    setIsDuration(duration);
  };
  return (
    <>
      <input
        type="radio"
        id={`${category}-duration`}
        value="duration"
        disabled={enabled ? false : true}
        onChange={handleChange}
        checked={isDuration}
      />
      <label htmlFor={`${category}-duration`}> Duration </label>
      <input
        type="radio"
        id={`${category}-date`}
        value="date"
        disabled={enabled ? false : true}
        onChange={handleChange}
        checked={!isDuration}
      />
      <label htmlFor={`${category}-date`}> Date</label>
    </>
  );
};
export default RadioButton;
