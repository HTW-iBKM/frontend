import React, { ReactElement } from "react";
import PropTypes from "prop-types";

export default function InsertDriveFileIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8.83C20 8.3 19.79 7.79 19.41 7.42L14.58 2.59C14.21 2.21 13.7 2 13.17 2H6ZM13 8V3.5L18.5 9H14C13.45 9 13 8.55 13 8Z"/>
    </svg>
  );
}

InsertDriveFileIcon.propTypes = {
    className: PropTypes.string
};