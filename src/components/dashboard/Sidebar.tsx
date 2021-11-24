import React, {Fragment, ReactElement, useState} from "react";
import {ChevronDoubleRightIcon, HomeIcon, CollectionIcon} from "@heroicons/react/solid";


function Sidebar(): ReactElement {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/*<Transition
        as={Fragment}
        show={isCollapsed}
        enter="transition-all duration-500"
        enterFrom="-ml-44"
        enterTo="ml-0"
        leave="transition-all duration-500"
        leaveTo="-ml-44"
      ></Transition>*/}
      <div className="w-44 h-full relative">
        <div className={"absolute left-0 top-0 text-grayscale-light"}>
          <div className="bg-primary w-48 px-5 py-3 rounded-r-lg flex flex-row gap-5 items-center my-6 text-xs tracking-wider uppercase">
            <HomeIcon className="w-8 h-8"/><div>Home</div>
          </div>
          <div className="bg-primary w-48 p-5 py-3 rounded-r-lg flex flex-row gap-5 items-center my-6 text-xs tracking-wider uppercase">
            <CollectionIcon className="w-8 h-8"/><div>Dateien</div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0">
          <button
            onClick={() => {
              setIsCollapsed(!isCollapsed)
            }}
            className="w-full p-1"
          >
            <ChevronDoubleRightIcon className="h-5 w-5 float-right text-primary"/>
          </button>
        </div>
      </div>
    </>
  )
}
export default Sidebar