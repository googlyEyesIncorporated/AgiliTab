import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CSSProperties,
  ForwardedRef,
  MouseEventHandler,
  forwardRef,
} from "react";

interface IconProps {
  icon: IconDefinition;
  onClick?: MouseEventHandler<SVGSVGElement>;
  faStyle?: CSSProperties;
  iconClassName?: string;
  faClassName?: string;
  title?: string;
}

const Icon = forwardRef(
  (
    { faStyle, iconClassName, faClassName, ...rest }: IconProps,
    ref?: ForwardedRef<HTMLElement | null>
  ) => {
    return (
      <i ref={ref} aria-hidden="true" className={iconClassName}>
        <FontAwesomeIcon style={faStyle} className={faClassName} {...rest} />
      </i>
    );
  }
);

export default Icon;
