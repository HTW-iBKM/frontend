import React, {Fragment, ReactElement} from "react";
import {Menu, Transition} from "@headlessui/react";
import {CogIcon, LocationMarkerIcon, LogoutIcon, UserCircleIcon} from "@heroicons/react/outline";

function Navbar(): ReactElement {
  return (
    <>
      <h1 className={"text-xl font-medium"}>Exxeta iBKM</h1>
      <div className="flex flex-row gap-8 px-4">
        {/* Dropdown: Bilanzkreisauswahl */}
        <Menu as="div" className="relative block text-left">
          <Menu.Button>
              <span>
                <LocationMarkerIcon className="h-8 w-8 text-blue-500 inline-block mr-3"/>
              Bilanzkreis A
              </span>

          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-grayscale-light text-grayscale-darkest divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-grayscale-dark ring-opacity-5 focus:outline-none">
              <div className="p-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${
                        active ? 'bg-grayscale text-white' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Bilanzkreis A
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${
                        active ? 'bg-grayscale text-white' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      href="/account-settings"
                    >
                      Bilanzkreis B
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${
                        active ? 'bg-grayscale text-white' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      href="/account-settings"
                    >
                      Bilanzkreis C
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>

        </Menu>

        {/* Dropdown: User Menü */}
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button>
            <UserCircleIcon className="h-8 w-8 text-blue-500"/>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-grayscale-light text-grayscale-darkest divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-grayscale-dark ring-opacity-5 focus:outline-none">
              <div className="p-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${
                        active ? 'bg-grayscale text-white' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      <CogIcon className="h-5 w-5 mr-2 text-grayscale-darkest"/>
                      Einstellungen
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${
                        active ? 'bg-grayscale text-white' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      href="/account-settings"
                    >
                      <LogoutIcon className="h-5 w-5 mr-2 text-grayscale-darkest"/>
                      Abmelden
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>

        </Menu>
      </div>
    </>
  )
}
export default Navbar