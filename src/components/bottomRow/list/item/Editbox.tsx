export const EditBox = ({
  inputRef,
  name,
  fontColor,
  bgColor,
  index,
  closeAndSaveInput,
}: EditBoxProps) => {
  return (
    <li>
      <input
        ref={inputRef}
        data-testid={`todo-edit-${index}`}
        type="text"
        defaultValue={name}
        style={{
          color: fontColor,
          backgroundColor: bgColor,
          borderColor: fontColor,
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && inputRef.current) {
            closeAndSaveInput(inputRef.current.value);
          }
        }}
        className="todo-edit w-full"
      />
    </li>
  );
};

interface EditBoxProps extends TaskProps {
  closeAndSaveInput: (name: string) => void;
}

interface TaskProps {
  index: number;
  fontColor: string;
  bgColor: string;
  name: string;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
}
