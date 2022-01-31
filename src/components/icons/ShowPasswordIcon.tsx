import React, {ReactElement} from "react";
import PropTypes from "prop-types";

export default function ShowPasswordIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className={props.className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.99998 3.75C5.83331 3.75 2.27498 6.34167 0.833313 10C2.27498 13.6583 5.83331 16.25 9.99998 16.25C14.1666 16.25 17.725 13.6583 19.1666 10C17.725 6.34167 14.1666 3.75 9.99998 3.75ZM9.99998 14.1667C7.69998 14.1667 5.83331 12.3 5.83331 10C5.83331 7.7 7.69998 5.83333 9.99998 5.83333C12.3 5.83333 14.1666 7.7 14.1666 10C14.1666 12.3 12.3 14.1667 9.99998 14.1667ZM9.99998 7.5C8.61665 7.5 7.49998 8.61667 7.49998 10C7.49998 11.3833 8.61665 12.5 9.99998 12.5C11.3833 12.5 12.5 11.3833 12.5 10C12.5 8.61667 11.3833 7.5 9.99998 7.5Z" fill="#494B51"/>
    </svg>
  );
}

ShowPasswordIcon.propTypes = {
    className: PropTypes.string
};