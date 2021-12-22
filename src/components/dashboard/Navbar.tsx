import React, { Fragment, ReactElement, useState } from "react";
import { Menu, Transition, RadioGroup } from "@headlessui/react";
import UserIcon from "../icons/UserIcon"
import LocationIcon from "../icons/LocationIcon";
import PowerIcon from "../icons/PowerIcon";
import SettingsIcon from "../icons/SettingsIcon";
import EditIcon from "../icons/EditIcon";
import auth from "../../services/Auth";
import { useHistory } from "react-router-dom";
import CheckboxCheckedIcon from "../icons/CheckboxCheckedIcon";
import CheckboxUncheckedIcon from "../icons/CheckboxUncheckedIcon";


function Navbar(): ReactElement {

  const history = useHistory();
  const styles = {
    navbarIcon: 'h-[24px] w-[24px] ',
    menuItem: 'absolute right-0 mt-2 origin-top-right bg-grayscale-light z-10 text-grayscale-darkest divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-grayscale-dark ring-opacity-5 focus:outline-none '
  }

  const [balancingGroup, setBalancingGroup] = useState('Bilanzkreis A')

  return (
    <div className={"h-14 flex items-center justify-between "}>
      <h6>Exxeta iBKM</h6>
      <div className="flex flex-row gap-16 px-4">
        {/* Dropdown: Bilanzkreisauswahl */}
        <Menu as="div" className="relative block text-left">
          <Menu.Button className="h-full flex flex-row gap-4 items-center">
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
            <Menu.Items className={styles.menuItem}>
              <div className="p-2">
                <RadioGroup value={balancingGroup} onChange={setBalancingGroup}>

                  <RadioGroup.Option value="Bilanzkreis A" className={'h-8 group flex gap-2 rounded-md items-center content-center w-full px-2 py-2 text-sm hover:bg-grayscale hover:cursor-pointer'}>
                    {({ checked }) => (
                      <>
                        {checked ? (
                          <CheckboxCheckedIcon className="w-4 h-4 text-grayscale-darkest" />
                        ) : (<CheckboxUncheckedIcon className="w-4 h-4 text-grayscale-darkest" />)}
                        <span className={"whitespace-nowrap"}>Bilanzkreis A</span>
                      </>
                    )}
                  </RadioGroup.Option>

                  <RadioGroup.Option value="Bilanzkreis B" className={'h-8 group flex gap-2 rounded-md items-center content-center w-full px-2 py-2 text-sm hover:bg-grayscale hover:cursor-pointer'}>
                    {({ checked }) => (
                      <>
                        {checked ? (
                          <CheckboxCheckedIcon className="w-4 h-4 text-grayscale-darkest" />
                        ) : (<CheckboxUncheckedIcon className="w-4 h-4 text-grayscale-darkest" />)}
                        <span className={"whitespace-nowrap"}>Bilanzkreis B</span>
                      </>
                    )}
                  </RadioGroup.Option>
                </RadioGroup>
                <Menu.Item>
                  {({ active }) => (
                    <>
                      <div className={"h-[1px] w-full my-2 bg-grayscale"}></div>
                      <span
                        className={`${active ? 'bg-grayscale' : ''
                          } h-8 group flex gap-2 rounded-md items-center w-full px-2 py-2 text-sm hover:bg-grayscale`}
                      >
                        <EditIcon className="w-4 h-4 text-grayscale-darkest" />
                        <span className={"inline-block whitespace-nowrap"}>Bearbeiten</span>
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
            <Menu.Items className={styles.menuItem}>
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
                      onClick={() => auth.logout(() => history.push('login'))}
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
