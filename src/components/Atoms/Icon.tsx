import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, MouseEventHandler } from "react";

interface IconProps {
  icon: IconDefinition;
  onClick?: MouseEventHandler<SVGSVGElement>;
  faStyle?: CSSProperties;
  iconClassName?: string;
  faId?: string;
  faClassName?: string;
  title?: string;
}

const Icon = ({
  faStyle,
  iconClassName,
  faId,
  faClassName,
  ...rest
}: IconProps) => {
  return (
    <i aria-hidden="true" className={iconClassName}>
      <FontAwesomeIcon
        style={faStyle}
        id={faId}
        className={faClassName}
        {...rest}
      />
    </i>
  );
};

export default Icon;
