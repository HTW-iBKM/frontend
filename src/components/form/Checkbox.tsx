import React, { FC, useState } from "react";
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
    const [hover, setHover] = useState(false);
    const [active, setActive] = useState(false);

    const labelStyles = 'flex flex-row items-center text-grayscale-darkest';
    const stylesDisabledLabel = 'flex flex-row items-center text-grayscale-dark'

    const hiddenHMTLCheckbox = 'absolute opacity-0 left-0';

    const basicCheckboxStyles = 'w-5 h-5 text-grayscale-darkest mr-3';
    const stylesActiveCheckbox = 'w-5 h-5 text-secondary mr-3';
    const stylesHoverCheckbox = 'w-5 h-5 text-secondary-light mr-3';
    const stylesDisabledCheckbox = 'w-5 h-5 text-grayscale-dark mr-3';


    return (
        <label {...others} className={disabled ? stylesDisabledLabel : labelStyles} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)}>
            <input
                className={hiddenHMTLCheckbox}
                id={name}
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
                disabled={disabled}
            />
            {checked ? (
                <CheckboxCheckedIcon className={disabled ? stylesDisabledCheckbox : active ? stylesActiveCheckbox : hover ? stylesHoverCheckbox : basicCheckboxStyles} />
            ) : (<CheckboxUncheckedIcon className={disabled ? stylesDisabledCheckbox : active ? stylesActiveCheckbox : hover ? stylesHoverCheckbox : basicCheckboxStyles} />)}

            {children}
        </label>
    );
};

export default Checkbox;
