import React, { FC } from 'react';
import LoadingDarkIcon from "../icons/LoadingDarkIcon";
import LoadingLightIcon from "../icons/LoadingLightIcon";

interface Styles {
  default: string;
  disabled: string;
  hover: string;
  focus: string;
  active: string;
}
type ButtonVariant = "primary" | "secondary" | "danger" | "text" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  isLoading?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ onClick, children, variant, isLoading, className, disabled, ...rest }: ButtonProps) => {
  const stylesPrimary = {
    default: 'bg-secondary text-grayscale-light uppercase px-4 py-2 min-w-[113px] min-h-[43px] rounded-lg text-center text-base tracking-wider font-medium',
    disabled: 'disabled:bg-grayscale-dark disabled:text-grayscale-light',
    hover: 'hover:bg-secondary-light !hover:ring-0 hover:focus:active:ring-0 hover:focus:active:outline-none',
    focus: 'focus:ring focus:ring-secondary focus:ring-opacity-20',
    active: 'active:bg-primary'
  }

  const stylesSecondary = {
    default: 'border-secondary text-secondary border-2 uppercase text-grayscale-light px-4 py-2 min-w-[113px] min-h-[43px] rounded-lg text-center text-base tracking-wider font-medium',
    disabled: 'disabled:border-2 disabled:border-grayscale-dark disabled:text-grayscale-dark',
    hover: 'hover:border-secondary-light hover:text-secondary-light',
    focus: 'focus:outline-none focus:ring focus:ring-secondary focus:ring-opacity-20',
    active: 'active:border-primary active:text-primary active:outline-none'
  }

  const stylesDanger = {
    default: 'bg-danger text-grayscale-light uppercase px-4 py-2 min-w-[113px] min-h-[43px] rounded-lg text-center text-base tracking-wider font-medium',
    disabled: 'disabled:bg-grayscale-dark disabled:text-grayscale-light',
    hover: 'hover:bg-[#d67871] !hover:ring-0 hover:focus:active:ring-0 hover:focus:active:outline-none',
    focus: 'focus:ring focus:ring-[#bf2318] focus:ring-opacity-20',
    active: 'active:bg-[#bf2318]'
  }

  const stylesText = {
    default: 'border-secondary text-secondary uppercase text-grayscale-light uppercase px-4 py-2 min-w-[113px] min-h-[43px] rounded-lg text-center text-base tracking-wider font-medium',
    disabled: 'disabled:text-grayscale-dark',
    hover: 'hover:text-secondary-light',
    focus: 'focus:outline-none focus:ring focus:ring-secondary focus:ring-opacity-20',
    active: 'active:text-primary active:outline-none'
  }

  const stylesIcon = {
    default: 'text-grayscale-darkest h-6 w-6 p-1 rounded',
    hover: 'hover:text-secondary-light hover:bg-grayscale',
    focus: 'focus:text-grayscale-darkest focus:outline-none focus:bg-secondary focus:bg-opacity-20',
    active: 'active:text-secondary active:outline-none active:bg-transparent',
    disabled: 'disabled:text-grayscale-dark disabled:bg-transparent disabled:cursor-default'
  }

  const combineStyles = (styles: Styles) => Object.keys(styles).map(key => styles[key as keyof Styles]).join(' ');

  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isDanger = variant === "danger";
  const isText = variant === "text";
  const isIcon = variant === "icon";

  const combinedClassName = (variant: ButtonVariant) => {
    switch (variant) {
      case 'text':
        return combineStyles(stylesText);
      case 'primary':
        return combineStyles(stylesPrimary);
      case 'secondary':
        return combineStyles(stylesSecondary);
      case 'danger':
        return combineStyles(stylesDanger);
      case 'icon':
        return combineStyles(stylesIcon);
      default:
        return combineStyles(stylesPrimary);
    }
  }

  return (
    <button
      onClick={onClick}
      className={`
        ${className} ${combinedClassName(variant)} 
        ${isLoading && isPrimary ? "!bg-primary" : ""} 
        ${isLoading && isSecondary ? "!border-primary" : ""} 
        ${isLoading && isDanger ? "!bg-danger" : ""} 
        ${isLoading && isText ? "!text-primary" : ""}
      `}
      type="button"
      disabled={disabled}
      {...rest}
    >
      {!isLoading && children}
      {isLoading && isPrimary && <LoadingLightIcon className={"h-5 w-5 m-auto animate-spin"}></LoadingLightIcon>}
      {isLoading && isSecondary && <LoadingDarkIcon className={"h-5 w-5 m-auto animate-spin"}></LoadingDarkIcon>}
      {isLoading && isDanger && <LoadingLightIcon className={"h-5 w-5 m-auto animate-spin"}></LoadingLightIcon>}
      {isLoading && isIcon && <LoadingDarkIcon className={"h-4 w-4 m-auto animate-spin"}></LoadingDarkIcon>}
      {isLoading && isText && <>loading ...</>}
    </button >
  )
}

export default Button;
