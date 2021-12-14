import React, {ReactElement} from "react";

export default function WarningIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.3" d="M4.46997 19H19.53L12 5.98999L4.46997 19ZM13 18H11V16H13V18ZM13 14H11V9.99999H13V14Z" fill="#E8BD50"/>
      <path d="M1 21H23L12 2L1 21ZM4.47 19L12 5.99L19.53 19H4.47ZM11 16H13V18H11V16ZM11 10H13V14H11V10Z" fill="#E8BD50"/>
    </svg>
  );
}