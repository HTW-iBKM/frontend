import React, { FC } from "react";

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
    return (
        <div {...others}>
            <input
                id={name}
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
                disabled={disabled}
            />
            <label htmlFor={name}>{children}</label>
        </div>
    );
};

export default Checkbox;
