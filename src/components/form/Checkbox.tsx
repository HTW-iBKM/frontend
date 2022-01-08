import React, { FC } from "react";
import CheckboxCheckedIcon from "../icons/CheckboxCheckedIcon";
import CheckboxUncheckedIcon from "../icons/CheckboxUncheckedIcon";

interface CheckboxProps<T> {
    name: string;
    checked: boolean;
    disabled?: boolean;
    onChange(value: T): void;
    children: React.ReactNode;
}

const Checkbox: FC<CheckboxProps<boolean>> = ({
    name,
    checked,
    disabled = false,
    onChange,
    children,
    ...others
}: CheckboxProps<boolean>) => {
    const container = 'flex flex-row items-center';
    const hiddenHMTLCheckbox = 'absolute opacity-0 left-0';
    const basicCheckbox = 'w-5 h-5 text-grayscale-darkest inline-block mr-3';
    return (
        <label {...others} className={container}>
            <input
                className={hiddenHMTLCheckbox}
                id={name}
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
                disabled={disabled}
            />
            {checked ? (
                <CheckboxCheckedIcon className={basicCheckbox} />
            ) : (<CheckboxUncheckedIcon className={basicCheckbox} />)}

            {children}
        </label>
    );
};

export default Checkbox;
