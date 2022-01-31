import React, {ReactElement} from "react";
import PropTypes from "prop-types";
import DrownDownIcon from "./DropDownIcon";

export default function HomeActiveIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L2 12H5V20H11V14H13V20H19V12H22L12 3ZM17 18H15V12H9V18H7V10.19L12 5.69L17 10.19V18Z" fill="#4074B2"/>
      <path opacity="0.3" d="M7 10.1899V17.9999H9V11.9999H15V17.9999H17V10.1899L12 5.68994L7 10.1899Z" fill="#4074B2"/>
    </svg>
  );
}

HomeActiveIcon.propTypes = {
    className: PropTypes.string
};