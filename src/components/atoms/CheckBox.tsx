interface CheckBoxProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nameId: string;
  labelText: string;
  checked?: boolean;
  disabled?: boolean;
  inputStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  className?: string;
  labelClass?: string;
  labelOnRight?: boolean;
  "data-testid"?: string;
}

const CheckBox = ({
  nameId,
  labelText,
  inputStyle,
  labelStyle,
  labelClass,
  labelOnRight,
  ...rest
}: CheckBoxProps) => {
  return (
    <>
      {labelOnRight && (
        <label
          style={labelStyle}
          htmlFor={nameId}
          className={`cursor-pointer ${labelClass ?? ""}`}
        >
          {labelText}
        </label>
      )}
      <input
        type="checkbox"
        name={nameId}
        id={nameId}
        style={inputStyle}
        {...rest}
      />
      {!labelOnRight && (
        <label style={labelStyle} htmlFor={nameId} className={labelClass}>
          {labelText}
        </label>
      )}
    </>
  );
};

export default CheckBox;
