import React, {Fragment, ReactElement, useState} from "react";
import HomeActiveLinkIcon from "../icons/HomeActiveLinkIcon";
import HomeInactiveIcon from "../icons/HomeInactiveIcon";
import {Transition} from "@headlessui/react";
import {useRouteMatch, NavLink, useLocation} from "react-router-dom";
import {Match} from "@testing-library/react";
import FileActiveLinkIcon from "../icons/FileActiveLinkIcon";
import FileInactiveIcon from "../icons/FileInactiveIcon";
import DoubleArrowIcon from "../icons/DoubleArrowIcon";
import FileHoverIcon from "../icons/FileHoverIcon";
import HomeHoverIcon from "../icons/HomeHoverIcon";
import HomeActiveIcon from "../icons/HomeActiveIcon";
import FileActiveIcon from "../icons/FileActiveIcon";

interface SidebarLink {
  id: number;
  iconActiveLink: ReactElement;
  iconInactiveLink: ReactElement;
  iconHover: ReactElement;
  iconActive: ReactElement;
  linkUrl: string;
  text: string;
}

interface SidebarLinkProps {
  sidebarLink: SidebarLink;
  children: React.ReactNode;
}

function Sidebar(): ReactElement {
  const [isExpanded, setIsExpanded] = useState(false);

  const styles = {
    sidebarIcon: 'w-6 h-6'
  };

  const sidebarLinks: SidebarLink[] = [
    { id:  0, iconActive: <HomeActiveIcon className={styles.sidebarIcon}/> , iconHover: <HomeHoverIcon className={styles.sidebarIcon}/> , iconActiveLink: <HomeActiveLinkIcon className={styles.sidebarIcon}/>, iconInactiveLink: <HomeInactiveIcon className={styles.sidebarIcon}/>, linkUrl: '', text: 'Home' },
    { id: 1, iconActive: <FileActiveIcon className={styles.sidebarIcon}/> ,  iconHover: <FileHoverIcon className={styles.sidebarIcon}/>, iconActiveLink: <FileActiveLinkIcon className={styles.sidebarIcon}/>, iconInactiveLink: <FileInactiveIcon className={styles.sidebarIcon}/>, linkUrl: `/files`, text: 'Dateien' }
  ];

  return (
    <>
      <div className="text-grayscale-light h-full flex flex-col gap-4 py-4">
        {sidebarLinks.map((sidebarLink: SidebarLink) => {
          return (
            <SidebarLink key={sidebarLink.id} sidebarLink={sidebarLink}>
              <div className="overflow-hidden">
                <Transition
                  as={Fragment}
                  show={isExpanded}
                  enter="transition-all duration-500"
                  enterFrom="-ml-44"
                  enterTo="ml-0"
                  leave="transition-all duration-500"
                  leaveTo="-ml-44">
                  <span className="w-full pl-4 pr-4">{sidebarLink.text}</span>
                </Transition>
              </div>
            </SidebarLink>
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
        } transform transition-all ease-in-out duration-300 h-4 w-4 text-secondary m-auto`}/>
      </button>
    </>
  );
}


const SidebarLink: React.FC<SidebarLinkProps> = ({children, sidebarLink}: SidebarLinkProps): ReactElement => {
  const [isHovered, setIsHovered] = useState(false);

  const location = useLocation<Location>();
  const match = useRouteMatch<Match>();
  const isActiveLink = location.pathname === match.url + sidebarLink.linkUrl;

  const styles = {
    sidebarLink: 'relative px-4 py-4 flex flex-row items-center text-sm tracking-wider uppercase hover:pointer font-medium ',
    sidebarLinkInactive: 'text-grayscale-dark hover:text-secondary',
    sidebarLinkActive: 'text-sm bg-secondary after:bg-secondary after:rounded-r-lg after:w-[10px] after:h-full after:absolute after:right-[-10px] after:top-0 after:bottom-0',
  };
  return (
    <NavLink
      exact
      to={match.url + sidebarLink.linkUrl}
      className={(isActive: boolean): string => {
        return isActive
          ? styles.sidebarLink
          : styles.sidebarLink + styles.sidebarLinkInactive;
      }}
      activeClassName={styles.sidebarLinkActive}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isActiveLink && !isHovered && sidebarLink.iconActiveLink}
      {isHovered && !isActiveLink && sidebarLink.iconHover}
      {isHovered && isActiveLink && sidebarLink.iconActiveLink}
      {!isHovered && !isActiveLink && sidebarLink.iconInactiveLink}
      {children}
    </NavLink>
  );
}

export default Sidebar
