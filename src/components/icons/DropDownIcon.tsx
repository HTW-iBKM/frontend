import React, {ReactElement} from "react";
import PropTypes from "prop-types";

export default function DrownDownIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className={props.className} viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.41327 9.19373L7.99994 6.76873L10.5866 9.19373C10.8466 9.43747 11.2666 9.43747 11.5266 9.19373C11.7866 8.94998 11.7866 8.55623 11.5266 8.31248L8.46661 5.44374C8.20661 5.19999 7.78661 5.19999 7.52661 5.44374L4.46661 8.31248C4.20661 8.55623 4.20661 8.94998 4.46661 9.19373C4.72661 9.43122 5.15327 9.43747 5.41327 9.19373Z" fill="#494B51"/>
      <path d="M5.41327 14.8062L7.99994 17.2312L10.5866 14.8062C10.8466 14.5625 11.2666 14.5625 11.5266 14.8062C11.7866 15.05 11.7866 15.4437 11.5266 15.6875L8.46661 18.5562C8.20661 18.8 7.78661 18.8 7.52661 18.5562L4.46661 15.6875C4.20661 15.4437 4.20661 15.05 4.46661 14.8062C4.72661 14.5687 5.15327 14.5625 5.41327 14.8062Z" fill="#494B51"/>
    </svg>
  );
}

DrownDownIcon.propTypes = {
    className: PropTypes.string
};