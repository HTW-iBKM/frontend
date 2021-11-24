import React, {ReactElement} from 'react';

interface LayoutProps {
  top: ReactElement;
  left: ReactElement;
  center: ReactElement;
}
function Layout(props: LayoutProps) {
  return (
    <div className={"h-full w-full flex flex-col"}>
      <div className="h-20 bg-primary-dark rounded-b shadow-lg text-grayscale-light flex items-center justify-between px-4">
        {props.top}
      </div>
      <div className="flex-1 flex gap-4">
        <div className="bg-grayscale-light shadow-lg">{props.left}</div>
        <div className="flex-1">{props.center}</div>
      </div>
    </div>
  )
}

export default Layout;
