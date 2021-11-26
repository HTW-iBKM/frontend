import React, {Fragment, ReactElement, useState} from "react";
import {ChevronDoubleRightIcon, HomeIcon, CollectionIcon} from "@heroicons/react/solid";
import {Transition} from "@headlessui/react";
import {Link, useRouteMatch} from "react-router-dom";
import {Match} from "@testing-library/react";

interface SidebarLink {
  id: number;
  icon: ReactElement;
  linkUrl: string;
  text: string;
}

function Sidebar(): ReactElement {
  const [isExpanded, setIsExpanded] = useState(false);
  const match = useRouteMatch<Match>();
  const styles = {
    sidebarLink: 'relative bg-primary px-3 py-5 flex flex-row items-center text-xs tracking-wider uppercase after:bg-primary ' +
          'after:rounded-r-lg after:w-[10px] after:h-full after:absolute after:right-[-10px] after:top-0 after:bottom-0"',
  }

  const sidebarLinks: SidebarLink[] = [
    { id:  0, icon: <HomeIcon className="w-8 h-8"/>, linkUrl: match.url, text: 'Home' },
    { id: 1, icon: <CollectionIcon className="w-8 h-8"/>, linkUrl: `${match.url}/files`, text: 'Dateien' }
  ]

  return (
    <>
      <div className="relative text-grayscale-light h-full flex flex-col gap-8 pt-8">
        {sidebarLinks.map((sidebarLink: SidebarLink) => { return (
          <Link key={sidebarLink.id} to={sidebarLink.linkUrl} className={styles.sidebarLink}>
            {sidebarLink.icon}
            <div className="overflow-hidden">
              <Transition
                as={Fragment}
                show={isExpanded}
                enter="transition-all duration-500"
                enterFrom="-ml-44"
                enterTo="ml-0"
                leave="transition-all duration-500"
                leaveTo="-ml-44">
                  <span className="w-full pl-6 pr-14">{sidebarLink.text}</span>
              </Transition>
            </div>
          </Link>
        )})}
      </div>

      <button
        onClick={() => {
          setIsExpanded(!isExpanded)
        }}
        className="w-full p-1 text-center"
      >
        <ChevronDoubleRightIcon className={`${
          isExpanded ? '-rotate-180' : ''
        } transform transition-all ease-in-out duration-300 h-5 w-5 text-primary m-auto`}/>
      </button>
    </>
  )
}


export default Sidebar