import React, { ReactNode, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { MenuItem, CoreMenuItemProps } from "./MenuItem";

interface ContextMenuProps {
    anchorIcon: ReactNode;
    anchorLabel?: string;
    customMenuItem?: ReactNode;
    menuItems: CoreMenuItemProps[];
}

const ContextMenu = ({
    anchorIcon, anchorLabel, customMenuItem, menuItems
}: ContextMenuProps) => {

    const styles = {
        menu: "absolute right-0 mt-2 origin-top-right bg-grayscale-light z-10 text-grayscale-darkest rounded-md shadow-lg ring-1 ring-grayscale-dark ring-opacity-5 focus:outline-none flex flex-col gap-2 p-2",
        anchor: "h-[24px] w-[24px] ",
        menuItem:
            "flex gap-3 rounded-md items-center p-2 text-base hover:bg-grayscale cursor-pointer",
        activeMenuItem:
            "bg-grayscale flex gap-3 rounded-md items-center p-2 text-base cursor-pointer",
        menuItemIcon: "w-4 h-4 text-grayscale-darkest mx-0.5",
    };

    return (
        <Menu as="div" className="relative block text-left">
            <Menu.Button className="h-full flex flex-row gap-4 items-center">
                <span className={styles.anchor} >{anchorIcon}</span>
                {anchorLabel && <span>{anchorLabel}</span>}
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
                <Menu.Items className={styles.menu}>
                    {customMenuItem}
                    {menuItems.map((item, index) => {
                        return (<>
                            {!customMenuItem && index != 0 && <div className={"h-[1px] w-full bg-grayscale"}></div>}
                            <Menu.Item key={index}>
                                {({ active }) => (
                                    <MenuItem {...item} active={active}
                                    />
                                )}
                            </Menu.Item></>
                        )
                    })}
                </Menu.Items>
            </Transition>
        </Menu>
    )
};

export default ContextMenu;
