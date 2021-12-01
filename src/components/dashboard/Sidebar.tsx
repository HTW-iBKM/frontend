import React, {Fragment, ReactElement, useState} from "react";
import HomeActiveIcon from "../icons/HomeActiveIcon";
import HomeInactiveIcon from "../icons/HomeInactiveIcon";
import {Transition} from "@headlessui/react";
import {useRouteMatch, NavLink, useLocation} from "react-router-dom";
import {Match} from "@testing-library/react";
import FileActiveIcon from "../icons/FileActiveIcon";
import FileInactiveIcon from "../icons/FileInactiveIcon";
import DoubleArrowIcon from "../icons/DoubleArrowIcon";

interface SidebarLink {
  id: number;
  iconActive: ReactElement;
  iconInactive: ReactElement;
  linkUrl: string;
  text: string;
}

function Sidebar(): ReactElement {
  const [isExpanded, setIsExpanded] = useState(false);
  const match = useRouteMatch<Match>();
  const location = useLocation();

  const styles = {
    sidebarLink: 'relative px-5 py-4 flex flex-row items-center text-sm tracking-wider uppercase ',
    sidebarLinkInactive: 'text-grayscale-dark ',
    sidebarLinkActive: 'text-sm bg-secondary after:bg-secondary after:rounded-r-lg after:w-[10px] after:h-full after:absolute after:right-[-10px] after:top-0 after:bottom-0',
    sidebarIcon: 'w-10 h-10'
  };

  const sidebarLinks: SidebarLink[] = [
    { id:  0, iconActive: <HomeActiveIcon className={styles.sidebarIcon}/>, iconInactive: <HomeInactiveIcon className={styles.sidebarIcon}/>, linkUrl: '', text: 'Home' },
    { id: 1, iconActive: <FileActiveIcon className={styles.sidebarIcon}/>, iconInactive: <FileInactiveIcon className={styles.sidebarIcon}/>, linkUrl: `/files`, text: 'Dateien' }
  ];

  return (
    <>
      <div className="text-grayscale-light h-full flex flex-col gap-4 py-4">
        {sidebarLinks.map((sidebarLink: SidebarLink) => {
          const isActive = location.pathname === match.url + sidebarLink.linkUrl;
          return (
            <NavLink
              exact
              key={sidebarLink.id}
              to={match.url + sidebarLink.linkUrl}
              className={(isActive: boolean) => {
                return isActive
                  ? styles.sidebarLink
                  : styles.sidebarLink + styles.sidebarLinkInactive;
              }}
              activeClassName={styles.sidebarLinkActive}
            >
              {isActive ? (
               sidebarLink.iconActive
              ) : (
                sidebarLink.iconInactive
              )}
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
          )}
        )}
      </div>

      <button
        onClick={() => {
          setIsExpanded(!isExpanded)
        }}
        className="w-full py-3 text-center"
      >
        <DoubleArrowIcon className={`${
          isExpanded ? '-rotate-180' : ''
        } transform transition-all ease-in-out duration-300 h-5 w-5 text-secondary m-auto`}/>
      </button>
    </>
  );
}



export default Sidebar