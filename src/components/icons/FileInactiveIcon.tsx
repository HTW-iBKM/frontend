import React, {ReactElement} from "react";

export default function FileInactiveIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className={props.className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.3" d="M21.6667 6.66663H10V33.3333H30V15H21.6667V6.66663Z" fill="#C1C1C6"/>
      <path d="M33.3333 13.3334L23.3333 3.33337H9.99996C8.16663 3.33337 6.68329 4.83337 6.68329 6.66671L6.66663 33.3334C6.66663 35.1667 8.14996 36.6667 9.98329 36.6667H30C31.8333 36.6667 33.3333 35.1667 33.3333 33.3334V13.3334ZM30 33.3334H9.99996V6.66671H21.6666V15H30V33.3334Z" fill="#C1C1C6"/>
    </svg>
  );
}