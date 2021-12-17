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
type ButtonVariant = "primary" | "secondary" | "text";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  isLoading?: boolean;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ onClick, children, variant, isLoading, ...rest }: ButtonProps) => {
  const stylesPrimary = {
    default: 'bg-secondary m-5 text-grayscale-light uppercase px-4 py-2 min-w-[113px] min-h-[43px] rounded-lg text-center text-base tracking-wider font-medium',
    disabled: 'disabled:bg-grayscale-dark disabled:text-grayscale-light',
    hover: 'hover:bg-primary-light !hover:ring-0 hover:focus:active:ring-0 hover:focus:active:outline-none',
    focus: 'focus:ring focus:ring-secondary focus:ring-opacity-20',
    active: 'active:bg-primary'
  }

  const stylesSecondary = {
    default: 'border-secondary text-secondary m-5 border-2 uppercase text-grayscale-light px-4 py-2 min-w-[113px] min-h-[43px] rounded-lg text-center text-base tracking-wider font-medium',
    disabled: 'disabled:border-2 disabled:border-grayscale-dark disabled:text-grayscale-dark',
    hover: 'hover:border-primary-light hover:text-primary-light',
    focus: 'focus:outline-none focus:ring focus:ring-secondary focus:ring-opacity-20',
    active: 'active:border-primary active:text-primary active:outline-none'
  }

  const stylesText = {
    default: 'border-secondary text-secondary m-5 uppercase text-grayscale-light uppercase px-4 py-2 min-w-[113px] min-h-[43px] rounded-lg text-center text-base tracking-wider font-medium',
    disabled: 'disabled:text-grayscale-dark',
    hover: 'hover:text-primary-light',
    focus: 'focus:outline-none focus:ring focus:ring-secondary focus:ring-opacity-20',
    active: 'active:text-primary active:outline-none'
  }

  const combineStyles = (styles: Styles) => Object.keys(styles).map(key => styles[key as keyof Styles]).join(' ');

  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isText = variant === "text";

  const className = (variant: ButtonVariant) => {
    switch (variant) {
      case 'text':
        return combineStyles(stylesText);
      case 'primary':
        return combineStyles(stylesPrimary);
      case 'secondary':
        return combineStyles(stylesSecondary);
      default:
        return combineStyles(stylesPrimary);
    }
  }

  return (
    <button
      onClick={onClick}
      className={`${className(variant)} ${isLoading && isPrimary ? "!bg-primary" : ""} ${isLoading && isSecondary ? "!border-primary" : ""} ${isLoading && isText ? "!text-primary" : ""}`}
      {...rest}
    >
      {!isLoading && children}
      {isLoading && isPrimary && <LoadingLightIcon className={"h-5 w-5 m-auto animate-spin"}></LoadingLightIcon>}
      {isLoading && isSecondary && <LoadingDarkIcon className={"h-5 w-5 m-auto animate-spin"}></LoadingDarkIcon>}
      {isLoading && isText && <>loading ...</>}
    </button >
  )
}

export default Button;
