interface CheckBoxProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  disabled: boolean;
  nameId: string;
  inputStyle: React.CSSProperties;
  labelText: string;
  labelStyle: React.CSSProperties;
}

const CheckBox = ({
  checked,
  onChange,
  disabled,
  nameId,
  inputStyle,
  labelText,
  labelStyle,
}: CheckBoxProps) => {
  return (
    <>
      <input
        type="checkbox"
        name={nameId}
        id={nameId}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={inputStyle}
      />

      <label style={labelStyle} htmlFor={nameId}>
        {labelText}
      </label>
    </>
  );
};

export default CheckBox;
