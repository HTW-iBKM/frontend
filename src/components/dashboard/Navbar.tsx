import React, { Fragment, ReactElement, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import UserIcon from "../icons/UserIcon"
import LocationIcon from "../icons/LocationIcon";
import PowerIcon from "../icons/PowerIcon";
import SettingsIcon from "../icons/SettingsIcon";
import EditIcon from "../icons/EditIcon";
import RadioButtonGroup from "../form/RadioButtonGroup";

function Navbar(): ReactElement {
  const styles = {
    navbarIcon: 'h-[24px] w-[24px]',
  }

  const [balancingGroup, setBalancingGroup] = useState('Bilanzkreis A')

  return (
    <div className={"h-14 flex items-center justify-between "}>
      <h6>Exxeta iBKM</h6>
      <div className="flex flex-row gap-16 px-4">
        {/* Dropdown: Bilanzkreisauswahl */}
        <Menu as="div" className="relative block text-left">
          <Menu.Button className="h-full flex flex-row gap-4 items-center text-base">
            <LocationIcon className={styles.navbarIcon} />
            <span>{balancingGroup}</span>
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
            <Menu.Items className="absolute right-0 mt-2 origin-top-right bg-grayscale-light text-grayscale-darkest divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-grayscale-dark ring-opacity-5 focus:outline-none">
              <div className="p-2">
                <RadioButtonGroup value={balancingGroup} onChange={setBalancingGroup} options={["Bilanzkreis A", "Bilanzkreis B", "Bilanzkreis C"]}></RadioButtonGroup>
                <Menu.Item>
                  {({ active }) => (
                    <>
                      <div className={"h-[1px] w-full my-2 bg-grayscale"}></div>
                      <span
                        className={`${active ? 'bg-grayscale' : ''
                          } h-8 group flex gap-3 rounded-md items-center w-full px-2 py-2 text-sm hover:bg-grayscale`}
                      >
                        <EditIcon className="w-5 h-5 text-grayscale-darkest" />
                        <span className={"inline-block whitespace-nowrap text-base"}>Bearbeiten</span>
                      </span>
                    </>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>

        </Menu>

        {/* Dropdown: User Menü */}
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="h-full">
            <UserIcon className={styles.navbarIcon} />
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
            <Menu.Items className="absolute right-0 mt-2 origin-top-right bg-grayscale-light text-grayscale-darkest divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-grayscale-dark ring-opacity-5 focus:outline-none">
              <div className="p-2">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${active ? 'bg-grayscale text-white' : 'text-gray-900'
                        } h-8 group flex gap-2 rounded-md items-center w-full px-2 py-2 text-sm hover:cursor-pointer`}
                    >
                      <SettingsIcon className="h-4 w-4 text-grayscale-darkest" />
                      Einstellungen
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${active ? 'bg-grayscale text-white' : 'text-gray-900'
                        } h-8 group flex gap-2 rounded-md items-center w-full px-2 py-2 text-sm hover:cursor-pointer`}
                      href="/account-settings"
                    >
                      <PowerIcon className="h-4 w-4 text-grayscale-darkest" />
                      Abmelden
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>

        </Menu>
      </div>
    </div>
  )
}
export default Navbar