interface CheckBoxProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  nameId: string;
  labelText: string;
  disabled?: boolean;
  inputStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  className?: string;
}

const CheckBox = ({
  nameId,
  labelText,
  inputStyle,
  labelStyle,
  ...rest
}: CheckBoxProps) => {
  return (
    <>
      <input
        type="checkbox"
        name={nameId}
        id={nameId}
        style={inputStyle}
        {...rest}
      />

      <label style={labelStyle} htmlFor={nameId}>
        {labelText}
      </label>
    </>
  );
};

export default CheckBox;
