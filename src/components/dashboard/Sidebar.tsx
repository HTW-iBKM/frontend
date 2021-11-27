import React, {Fragment, ReactElement, useState} from "react";
import {ChevronDoubleRightIcon, HomeIcon, CollectionIcon} from "@heroicons/react/solid";
import {Transition} from "@headlessui/react";
import {Link, useRouteMatch, NavLink} from "react-router-dom";
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
    sidebarLink: 'relative px-5 py-5 flex flex-row items-center text-sm tracking-wider uppercase ',
    sidebarLinkInactive: ' text-grayscale-dark ',
    sidebarLinkActive: 'text-sm bg-secondary after:bg-secondary after:rounded-r-lg after:w-[10px] after:h-full after:absolute after:right-[-10px] after:top-0 after:bottom-0',
    sidebarIcon: 'w-7 h-7'
  };

  const sidebarLinks: SidebarLink[] = [
    { id:  0, icon: <HomeIcon className={styles.sidebarIcon}/>, linkUrl: match.url, text: 'Home' },
    { id: 1, icon: <CollectionIcon className={styles.sidebarIcon}/>, linkUrl: `${match.url}/files`, text: 'Dateien' }
  ];

  return (
    <>
      <div className="text-grayscale-light h-full flex flex-col gap-4 py-4">
        {sidebarLinks.map((sidebarLink: SidebarLink) => { return (
          <NavLink exact key={sidebarLink.id} to={sidebarLink.linkUrl} className={(isActive) => {
            return isActive
              ? `${styles.sidebarLink}`
              :  `${styles.sidebarLink + styles.sidebarLinkInactive}`;
            }
          } activeClassName={styles.sidebarLinkActive}
          >
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
                  <span className="w-full pl-4 pr-8">{sidebarLink.text}</span>
              </Transition>
            </div>
          </NavLink>
        )})}
      </div>

      <button
        onClick={() => {
          setIsExpanded(!isExpanded)
        }}
        className="w-full py-3 text-center"
      >
        <ChevronDoubleRightIcon className={`${
          isExpanded ? '-rotate-180' : ''
        } transform transition-all ease-in-out duration-300 h-5 w-5 text-secondary m-auto`}/>
      </button>
    </>
  );
}


export default Sidebar