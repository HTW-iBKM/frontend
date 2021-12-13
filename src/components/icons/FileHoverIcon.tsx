import React, {ReactElement} from "react";

export default function FileHoverIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className={props.className} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_602_2987)">
        <path opacity="0.3" d="M13.4126 4.97607H6.19043V20.9683H18.5714V9.97364H13.4126V4.97607Z" fill="#88B4CD"/>
        <path d="M20.6348 8.97412L14.4444 2.97705H6.19044C5.05552 2.97705 4.13727 3.87661 4.13727 4.97608L4.12695 20.9683C4.12695 22.0677 5.0452 22.9673 6.18012 22.9673H18.5714C19.7063 22.9673 20.6348 22.0677 20.6348 20.9683V8.97412ZM18.5714 20.9683H6.19044V4.97608H13.4126V9.97364H18.5714V20.9683Z" fill="#88B4CD"/>
      </g>
      <defs>
        <clipPath id="clip0_602_2987">
          <path d="M0 0.978027H16.7618C21.1801 0.978027 24.7618 4.55975 24.7618 8.97803V16.9663C24.7618 21.3846 21.1801 24.9663 16.7618 24.9663H0V0.978027Z" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}