import React, { ReactNode } from "react";

export interface CoreMenuItemProps {
    onClick?(): void;
    icon: ReactNode;
    buttonText: string;
}

interface AdditionalMenuItemProps {
    active: boolean;
}

export const MenuItem = ({
    active,
    onClick,
    icon,
    buttonText,
}: CoreMenuItemProps & AdditionalMenuItemProps) => {
    const styles = {
        menuItem:
            "flex gap-3 rounded-md items-center p-2 text-base hover:bg-grayscale cursor-pointer",
        activeMenuItem:
            "bg-grayscale flex gap-3 rounded-md items-center p-2 text-base cursor-pointer",
        menuItemIcon: "w-4 h-4 text-grayscale-darkest mx-0.5",
    };

    return (
        <a
            className={active ? styles.activeMenuItem : styles.menuItem}
            onClick={onClick}
        >
            <span className={styles.menuItemIcon}>{icon}</span>
            <span className={"inline-block whitespace-nowrap"}>{buttonText}</span>
        </a>
    )
};

