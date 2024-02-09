import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { ForwardedRef, MouseEventHandler, forwardRef, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectVisualSettings } from "../../features/settings/settingsSlice";

interface IconProps {
  icon: IconDefinition;
  onClick?: MouseEventHandler<SVGSVGElement>;
  iconClassName?: string;
  faClassName?: string;
  title?: string;
}

const Icon = forwardRef(
  (
    { iconClassName, faClassName, ...rest }: IconProps & FontAwesomeIconProps,
    ref?: ForwardedRef<HTMLElement | null>
  ) => {
    const { secondFontColor } = useAppSelector(selectVisualSettings);
    const [hover, setHover] = useState(false);
    // Hex color + opacity - https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
    const color = `${secondFontColor}${hover ? "" : "99"}`;
    const onMouseEnter = () => setHover(true);
    const onMouseLeave = () => setHover(false);
    return (
      <span ref={ref} aria-hidden="true" className={iconClassName}>
        <FontAwesomeIcon
          style={{ color }}
          className={faClassName}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          {...rest}
        />
      </span>
    );
  }
);

export default Icon;
