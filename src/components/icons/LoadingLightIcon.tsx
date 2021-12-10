import React, {ReactElement} from "react";

export default function LoadingLightIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className={props.className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1.48959C6.76387 1.48959 5.55549 1.87142 4.52769 2.58679C3.49988 3.30216 2.6988 4.31895 2.22575 5.50858C1.75271 6.6982 1.62893 8.00723 1.87009 9.27012C2.11125 10.533 2.7065 11.6931 3.58058 12.6036C4.45466 13.5141 5.5683 14.1341 6.78068 14.3853C7.99307 14.6365 9.24973 14.5076 10.3918 14.0148C11.5338 13.5221 12.5099 12.6876 13.1967 11.617C13.8834 10.5464 14.25 9.28764 14.25 8.00001" stroke="#FCFCFC" strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"}/>
    </svg>
  );
}