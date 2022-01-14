import React, { ReactElement } from "react";

export default function CheckboxCheckedIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className={props.className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className={'fill-current focus:ring-4 focus:ring-offset-2 focus:ring-secondary focus:ring-opacity-20'} d="M15.8333 2.5H4.16667C3.25 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.25 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V4.16667C17.5 3.25 16.75 2.5 15.8333 2.5ZM8.925 13.575C8.6 13.9 8.075 13.9 7.75 13.575L4.75833 10.5833C4.43333 10.2583 4.43333 9.73333 4.75833 9.40833C5.08333 9.08333 5.60833 9.08333 5.93333 9.40833L8.33333 11.8083L14.0667 6.075C14.3917 5.75 14.9167 5.75 15.2417 6.075C15.5667 6.4 15.5667 6.925 15.2417 7.25L8.925 13.575Z" fill="#494B51" />
    </svg>
  );
}