import React, {ReactElement} from "react";

export default function CloseIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className={props.className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.6666 4.27325L11.7266 3.33325L7.99992 7.05992L4.27325 3.33325L3.33325 4.27325L7.05992 7.99992L3.33325 11.7266L4.27325 12.6666L7.99992 8.93992L11.7266 12.6666L12.6666 11.7266L8.93992 7.99992L12.6666 4.27325Z" fill="#494B51"/>
    </svg>
  );
}