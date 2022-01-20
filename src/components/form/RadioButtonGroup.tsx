import React, { FC, useState } from 'react';
import { RadioGroup } from "@headlessui/react";
import RadioButtonUncheckedIcon from "../icons/RadioButtonUncheckedIcon";
import RadioButtonCheckedIcon from "../icons/RadioButtonCheckedIcon";

interface RadioButtonGroupProps<T> {
    options: string[];
    selected?: string;
    disabledOptions?: string[];
    onChange(value: T): void;
}

const RadioButtonGroup: FC<RadioButtonGroupProps<string>> = ({ selected = "", onChange, options, disabledOptions }: RadioButtonGroupProps<string>) => {
    const [value, setValue] = useState(selected);
    const [hover, setHover] = useState(String);
    const [active, setActive] = useState(String);

    const stylesRadioButton = 'flex gap-3 px-2 py-2 text-base rounded-lg items-center hover:cursor-pointer rounded-lg focus:outline-none';
    const stylesCheckmark = 'w-5 h-5 text-grayscale-darkest';
    const stylesActiveCheckmark = 'w-5 h-5 text-secondary';
    const stylesHoverCheckmark = 'w-5 h-5 text-secondary-light';
    const stylesDisabledChechmark = 'w-5 h-5 text-grayscale-dark';
    const stylesText = 'whitespace-nowrap text-base'
    const stylesDisabledText = 'text-grayscale-dark whitespace-nowrap'

    const changeValue = (newValue: string) => {
        setValue(newValue)
        onChange(newValue)
    }

    return (
        <RadioGroup value={value} onChange={(newValue) => { (changeValue(newValue)) }}>
            {options.map((option, index) => {
                const isDisabled = disabledOptions && disabledOptions.includes(option);
                const isActive = active == option;
                const isHover = hover == option;
                return (
                    <RadioGroup.Option disabled={isDisabled} value={option} key={index} className={stylesRadioButton} onMouseEnter={() => setHover(option)} onMouseLeave={() => setHover("")} onMouseDown={() => setActive(option)} onMouseUp={() => setActive("")}>
                        {({ checked }) => (
                            <>
                                {checked ? (
                                    <RadioButtonCheckedIcon className={stylesCheckmark} />
                                ) : (<RadioButtonUncheckedIcon className={isDisabled ? stylesDisabledChechmark : isActive ? stylesActiveCheckmark : isHover ? stylesHoverCheckmark : stylesCheckmark} />)}
                                <span className={isDisabled ? stylesDisabledText : stylesText}>{option}</span>
                            </>
                        )}
                    </RadioGroup.Option>
                )
            })
            }
        </RadioGroup >
    )
}

export default RadioButtonGroup;

