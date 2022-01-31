import React, {ReactElement} from "react";
import PropTypes from "prop-types";

export default function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.28859 6.71002C8.89859 7.10002 8.89859 7.73002 9.28859 8.12002L13.1686 12L9.28859 15.88C8.89859 16.27 8.89859 16.9 9.28859 17.29C9.67859 17.68 10.3086 17.68 10.6986 17.29L15.2886 12.7C15.6786 12.31 15.6786 11.68 15.2886 11.29L10.6986 6.70002C10.3186 6.32002 9.67859 6.32002 9.28859 6.71002Z" fill="#323232"/>
    </svg>
  );
}

ChevronRightIcon.propTypes = {
    className: PropTypes.string
};