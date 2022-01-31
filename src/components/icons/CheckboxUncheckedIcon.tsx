import React, { ReactElement } from "react";
import PropTypes from "prop-types";

export default function CheckboxUncheckedIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className={props.className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className={'fill-current focus:ring-4 focus:ring-offset-2 focus:ring-secondary focus:ring-opacity-20'} d="M15 15.8333H5C4.54167 15.8333 4.16667 15.4583 4.16667 15V5C4.16667 4.54167 4.54167 4.16667 5 4.16667H15C15.4583 4.16667 15.8333 4.54167 15.8333 5V15C15.8333 15.4583 15.4583 15.8333 15 15.8333ZM15.8333 2.5H4.16667C3.25 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.25 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V4.16667C17.5 3.25 16.75 2.5 15.8333 2.5Z" fill="#494B51" />
    </svg>
  );
}

CheckboxUncheckedIcon.propTypes = {
    className: PropTypes.string
};