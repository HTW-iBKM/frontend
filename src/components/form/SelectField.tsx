import React, {Fragment, ReactElement } from "react";
import {Menu, Transition} from "@headlessui/react";
import DropDownIcon from "../icons/DropDownIcon";
import CheckIcon from "../icons/CheckIcon";


type SelectFieldVariant = "default" | "small";
interface SelectFieldOption {
  label: string;
  value: string;
  disabled: boolean;
}

interface SelectFieldProps  {
  id?: string;
  variant: SelectFieldVariant;
  options: SelectFieldOption[];
  label?: string;
  onChange: (value: string) => void;
  value: SelectFieldOption;
  className?: string;
}
function SelectField({options, variant, label, onChange, className, value}: SelectFieldProps): ReactElement {
  const styles = {
    navbarIcon: 'h-[24px] w-[24px] ',
    selectFieldToggle: {
      default: "ring-1 ring-grayscale-dark border-2 border-grayscale-light rounded-lg h-10-1/8  text-left text-base text-grayscale-darkest font-normal leading-7-1/8 min-w-[4rem]",
      small: 'ring-1 ring-grayscale-dark border-2 border-grayscale-light rounded-lg h-8-1/8 text-left text-sm text-grayscale-darkest font-normal leading-4  min-w-[4rem]'
    },
    selectFieldButton: {
      default: 'w-full h-full flex items-center text-grayscale-darker px-4 min-w-[4rem]',
      small: 'w-full h-full flex items-center text-grayscale-darker px-3 min-w-[4rem]'
    },
    selectItems: 'absolute left-0 mt-2 min-w-full origin-top-left bg-grayscale-light z-10 text-grayscale-darkest divide-gray-100 ring-1 ring-grayscale-dark py-2 rounded-lg focus:outline-none ',
    selectItem: {
      default: 'h-10-1/8 group border-none flex items-center justify-between w-full px-4 py-2 text-base hover:cursor-pointer whitespace-nowrap flex-nowrap leading-7-1/8 focus:bg-secondary focus:text-grayscale-light active:bg-primary',
      small: 'h-8-1/8 group border-none flex items-center justify-between w-full px-3 py-2 text-sm hover:cursor-pointer whitespace-nowrap flex-nowrap leading-4 focus:bg-secondary focus:text-grayscale-light active:bg-primary',
    }
  }

  const isDefaultVariant = variant === "default";

  return (
    <Menu as="div" className={`${className} relative inline-block text-left`}>
      <div className={`${isDefaultVariant ? styles.selectFieldToggle.default : styles.selectFieldToggle.small}`}>
        <Menu.Button className={`${isDefaultVariant ? styles.selectFieldButton.default : styles.selectFieldButton.small}`}>
          {!value ? label : value.label}
          <DropDownIcon className={"h-6 w-4 ml-auto"}/>
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
                    ${option.value === value.value && !active && 'bg-secondary text-grayscale-light ring-x-1 ring-x-secondary'}
                    ${active && 'bg-secondary-light !text-grayscale-light ring-x-1 ring-x-secondary'}
                    ${isDefaultVariant ? styles.selectItem.default : styles.selectItem.small}
                    ${option.disabled ? 'opacity-50 pointer-events-none' : ''}
                  `}
                  onClick={() => onChange(option.value || value.value)}
                >
                  {option.label}
                  {option.value === value?.value && <CheckIcon className={"h-4 w-4"}/>}
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
