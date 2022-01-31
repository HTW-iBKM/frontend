import React, {ReactElement} from "react";
import PropTypes from "prop-types";

export default function DeleteForeverIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V9C18 7.9 17.1 7 16 7H8C6.9 7 6 7.9 6 9V19ZM9.17 11.17C9.56 10.78 10.19 10.78 10.58 11.17L12 12.59L13.42 11.17C13.81 10.78 14.44 10.78 14.83 11.17C15.22 11.56 15.22 12.19 14.83 12.58L13.41 14L14.83 15.42C15.22 15.81 15.22 16.44 14.83 16.83C14.44 17.22 13.81 17.22 13.42 16.83L12 15.41L10.58 16.83C10.19 17.22 9.56 17.22 9.17 16.83C8.78 16.44 8.78 15.81 9.17 15.42L10.59 14L9.17 12.58C8.78 12.2 8.78 11.56 9.17 11.17ZM15.5 4L14.79 3.29C14.61 3.11 14.35 3 14.09 3H9.91C9.65 3 9.39 3.11 9.21 3.29L8.5 4H6C5.45 4 5 4.45 5 5C5 5.55 5.45 6 6 6H18C18.55 6 19 5.55 19 5C19 4.45 18.55 4 18 4H15.5Z"/>
    </svg>
  );
}

DeleteForeverIcon.propTypes = {
    className: PropTypes.string
};