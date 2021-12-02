import React, {ReactElement} from "react";

export default function DoubleArrowIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5 5H11L16 12L11 19H15.5L20.5 12L15.5 5Z" fill="#212E50"/>
      <path d="M8.5 5H4L9 12L4 19H8.5L13.5 12L8.5 5Z" fill="#212E50"/>
    </svg>
  );
}