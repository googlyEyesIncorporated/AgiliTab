import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, MouseEventHandler } from "react";

interface IconProps {
  icon: IconDefinition;
  onClick?: MouseEventHandler<SVGSVGElement>;
  faStyle?: CSSProperties;
  iconClassName?: string;
  faClassName?: string;
  title?: string;
}

const Icon = ({ faStyle, iconClassName, faClassName, ...rest }: IconProps) => {
  return (
    <i aria-hidden="true" className={iconClassName}>
      <FontAwesomeIcon style={faStyle} className={faClassName} {...rest} />
    </i>
  );
};

export default Icon;
