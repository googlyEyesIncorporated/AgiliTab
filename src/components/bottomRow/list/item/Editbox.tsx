export const EditBox = ({
  inputRef,
  name,
  fontColor,
  bgColor,
  closeAndSaveInput,
}: EditBoxProps) => {
  return (
    <li>
      <input
        ref={inputRef}
        type="text"
        defaultValue={name}
        style={{
          color: fontColor,
          backgroundColor: bgColor,
          borderColor: fontColor,
          width: "100%",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && inputRef.current) {
            closeAndSaveInput(inputRef.current.value);
          }
        }}
        className="todo-edit"
      />
    </li>
  );
};

interface EditBoxProps extends TaskProps {
  closeAndSaveInput: (name: string) => void;
}

interface TaskProps {
  fontColor: string;
  bgColor: string;
  name: string;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
}
