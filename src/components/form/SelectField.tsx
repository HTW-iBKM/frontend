import React, {Fragment, ReactElement, useState} from "react";
import {Menu, Transition} from "@headlessui/react";
import DropDownIcon from "../icons/DropDownIcon";
import CheckIcon from "../icons/CheckIcon";


type SelectFieldVariant = "default" | "small";
interface SelectFieldOption {
  label: string;
  value: string;
}

interface SelectFieldProps<T> {
  variant: SelectFieldVariant;
  options: SelectFieldOption[];
  label: string;
  onChange(value: T): void;
}
function SelectField({options, variant, label, onChange}: SelectFieldProps<string>): ReactElement {
  const styles = {
    navbarIcon: 'h-[24px] w-[24px] ',
    selectFieldToggle: {
      default: "ring-1 ring-grayscale-dark border-2 border-grayscale-light rounded-lg h-10-1/8  text-left text-base text-grayscale-darkest font-normal leading-7-1/8",
      small: 'ring-1 ring-grayscale-dark border-2 border-grayscale-light rounded-lg h-8-1/8 text-left text-sm text-grayscale-darkest font-normal leading-4'
    },
    selectFieldButton: {
      default: 'h-full flex items-center text-grayscale-darker px-4',
      small: 'h-full flex items-center text-grayscale-darker px-3'
    },
    selectItems: 'absolute left-0 mt-2 min-w-full origin-top-left bg-grayscale-light z-10 text-grayscale-darkest divide-gray-100 ring-1 ring-grayscale-dark py-2 rounded-lg focus:outline-none ',
    selectItem: {
      default: 'h-10-1/8 group border-none flex items-center justify-between w-full px-4 py-2 text-base hover:cursor-pointer whitespace-nowrap flex-nowrap leading-7-1/8 focus:bg-secondary focus:text-grayscale-light',
      small: 'h-8-1/8 group border-none flex items-center justify-between w-full px-3 py-2 text-sm hover:cursor-pointer whitespace-nowrap flex-nowrap leading-4 focus:bg-secondary focus:text-grayscale-light',
    }
  }

  const isDefaultVariant = variant === "default";
  const [selectedOption, setSelectedOption] = useState<SelectFieldOption | null>(null)

  const selectValue = (option: SelectFieldOption) => {
    const match = selectedOption?.value === option.value;
    setSelectedOption( match? null : option)
    onChange(match ? '' : option.value)
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className={`${isDefaultVariant ? styles.selectFieldToggle.default : styles.selectFieldToggle.small}`}>
        <Menu.Button className={`${isDefaultVariant ? styles.selectFieldButton.default : styles.selectFieldButton.small}`}>
          {selectedOption != null ? selectedOption.label : label}
          <DropDownIcon className={"h-6 w-4 ml-6"}/>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={styles.selectItems}>
          {options.map((option, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <button
                  className={`
                    ${active || option.value == selectedOption?.value ? 'bg-secondary text-grayscale-light ring-x-1 ring-x-secondary' : 'text-grayscale-darkest'}
                    ${isDefaultVariant ? styles.selectItem.default : styles.selectItem.small}
                  `}
                  onClick={() => selectValue(option)}
                >
                  {option.label}
                  {option.value == selectedOption?.value && <CheckIcon className={"h-4 w-4"}/>}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}



export default SelectField