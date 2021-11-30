import React, {ReactElement} from "react";

export default function HomeIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className={props.className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 5L3.33337 20H8.33337V33.3333H18.3334V23.3333H21.6667V33.3333H31.6667V20H36.6667L20 5ZM28.3334 30H25V20H15V30H11.6667V16.9833L20 9.48333L28.3334 16.9833V30Z" fill="#FAFAFA"/>
      <path opacity="0.3" d="M11.6666 16.9833V29.9999H15V19.9999H25V29.9999H28.3333V16.9833L20 9.48328L11.6666 16.9833Z" fill="#88B4CD"/>
    </svg>

  );
}