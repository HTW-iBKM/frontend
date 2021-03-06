import React, {ReactElement} from "react";
import PropTypes from "prop-types";
export default function EqualizerIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 9H20V20H16V9ZM10 4H14V20H10V4ZM4 12H8V20H4V12Z" fill="currentColor"/>
    </svg>
  );
}
EqualizerIcon.propTypes = {
    className: PropTypes.string
};