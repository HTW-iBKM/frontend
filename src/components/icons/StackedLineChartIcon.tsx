import React, {ReactElement} from "react";
import PropTypes from "prop-types";

export default function StackedLineChartIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 19.99L9.5 12.48L13.5 16.48L20.59 8.51001L22 9.92001L13.5 19.48L9.5 15.48L3.5 21.49L2 19.99ZM3.5 15.49L9.5 9.48001L13.5 13.48L22 3.92001L20.59 2.51001L13.5 10.48L9.5 6.48001L2 13.99L3.5 15.49Z" fill="currentColor"/>
    </svg>
  );
}

StackedLineChartIcon.propTypes = {
    className: PropTypes.string
};