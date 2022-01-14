import React, { ChangeEventHandler, FC, useState } from "react";
import CheckboxCheckedIcon from "../icons/CheckboxCheckedIcon";
import CheckboxUncheckedIcon from "../icons/CheckboxUncheckedIcon";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    checked: boolean;
    disabled?: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    children: React.ReactNode;
    error?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({
    name,
    checked,
    disabled = false,
    onChange,
    children,
    error = false,
    ...others
}: CheckboxProps) => {
    const [hover, setHover] = useState(false);
    const [active, setActive] = useState(false);
    const [focus, setFocus] = useState(false);

    const label = 'flex flex-row items-center text-grayscale-darkest';
    const disabledLabel = 'flex flex-row items-center text-grayscale-dark'

    const hiddenHMTLCheckbox = 'absolute opacity-0 left-0';

    const basicCheckbox = 'w-5 h-5 text-grayscale-darkest mr-3 z-10 relative';
    const activeCheckbox = 'w-5 h-5 text-secondary mr-3 z-10';
    const hoverCheckbox = 'w-5 h-5 text-secondary-light mr-3 z-10';
    const disabledCheckbox = 'w-5 h-5 text-grayscale-dark mr-3 z-10';
    const errorCheckbox = 'w-5 h-5 text-danger mr-3 z-10';

    const focusRing = 'w-[1.375rem] h-[1.375rem] absolute rounded-sm border-4 border-solid border-secondary -ml-px opacity-20';

    return (
        <label className={disabled ? disabledLabel : label} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
            {focus && <span className={focusRing}></span>}
            <input
                className={hiddenHMTLCheckbox}
                id={name}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                {...others}
            />
            {checked ? (
                <CheckboxCheckedIcon className={disabled ? disabledCheckbox : error ? errorCheckbox : active ? activeCheckbox : hover ? hoverCheckbox : basicCheckbox} />
            ) : (<CheckboxUncheckedIcon className={disabled ? disabledCheckbox : error ? errorCheckbox : active ? activeCheckbox : hover ? hoverCheckbox : basicCheckbox} />)}
            {children}
        </label>
    );
};

export default Checkbox;
