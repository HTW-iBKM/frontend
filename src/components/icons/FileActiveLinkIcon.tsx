import React, {ReactElement} from "react";
import PropTypes from "prop-types";

export default function FileActiveLinkIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.3" d="M13 4H6V20H18V9H13V4Z" fill="#88B4CD"/>
      <path d="M20 8L14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8ZM18 20H6V4H13V9H18V20Z" fill="#FAFAFA"/>
    </svg>
  );
}

FileActiveLinkIcon.propTypes = {
    className: PropTypes.string
};