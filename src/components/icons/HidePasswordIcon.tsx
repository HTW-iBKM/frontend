import React, {ReactElement} from "react";
import PropTypes from "prop-types";

export default function EyeVisibleInactiveIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className={props.className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.99992 3.75C5.83325 3.75 2.27492 6.34167 0.833252 10C2.27492 13.6583 5.83325 16.25 9.99992 16.25C14.1666 16.25 17.7249 13.6583 19.1666 10C17.7249 6.34167 14.1666 3.75 9.99992 3.75ZM9.99992 14.1667C7.69992 14.1667 5.83325 12.3 5.83325 10C5.83325 7.7 7.69992 5.83333 9.99992 5.83333C12.2999 5.83333 14.1666 7.7 14.1666 10C14.1666 12.3 12.2999 14.1667 9.99992 14.1667ZM9.99992 7.5C8.61658 7.5 7.49992 8.61667 7.49992 10C7.49992 11.3833 8.61658 12.5 9.99992 12.5C11.3833 12.5 12.4999 11.3833 12.4999 10C12.4999 8.61667 11.3833 7.5 9.99992 7.5Z" fill="#494B51"/>
      <g filter="url(#filter0_d_206_78972)">
        <line x1="2.35355" y1="1.64645" x2="18.3536" y2="17.6464" stroke="black"/>
      </g>
      <defs>
        <filter id="filter0_d_206_78972" x="2" y="1.29291" width="16.707" height="17.7071" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="1"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.979167 0 0 0 0 0.979167 0 0 0 0 0.979167 0 0 0 1 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_206_78972"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_206_78972" result="shape"/>
        </filter>
      </defs>
    </svg>
  );
}

EyeVisibleInactiveIcon.propTypes = {
    className: PropTypes.string
};