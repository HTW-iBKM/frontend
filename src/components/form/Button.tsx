import React, { FC } from 'react';
import LoadingDarkIcon from "../icons/LoadingDarkIcon";

type ButtonVariant = "primary" | "secondary" | "text";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  isLoading?: boolean;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ onClick, children, variant, isLoading, ...rest }: ButtonProps) => {
  const stylesPrimary = 'disabled:bg-grayscale-dark disabled:text-grayscale-light hover:bg-primary-light active:bg-primary active:outline-none focus:outline-none focus:ring focus:ring-secondary focus:ring-opacity-20 bg-secondary m-5 text-grayscale-light uppercase px-4 py-2 min-w-[113px] min-h-[43px] rounded-lg text-center tracking-wider font-medium';
  const stylesSecondary = 'disabled:border-2 disabled:border-grayscale-dark disabled:text-grayscale-dark border-secondary hover:border-primary-light text-secondary hover:text-primary-light active:border-primary active:text-primary active:outline-none focus:outline-none focus:ring focus:ring-secondary focus:ring-opacity-20 m-5 border-2 uppercase text-grayscale-light px-4 py-2 min-w-[113px] min-h-[43px] rounded-lg text-center tracking-wider font-medium';
  const stylesText = 'disabled:text-grayscale-dark border-secondary text-secondary hover:text-primary-light active:text-primary active:outline-none focus:outline-none focus:ring focus:ring-secondary focus:ring-opacity-20 m-5 uppercase text-grayscale-light uppercase px-4 py-3 min-w-[113px]  rounded-lg text-center tracking-wider'

  const className = (variant: ButtonVariant) => {
    switch (variant) {
      case 'text':
        return stylesText;
      case 'primary':
        return stylesPrimary;
      case 'secondary':
        return stylesSecondary;
      default:
        return stylesPrimary;
    }
  }

  return (
    <button
      onClick={onClick}
      className={`${className(variant)}`}
      {...rest}
    >
      {!isLoading && children}
      {isLoading && variant === 'primary' && <LoadingDarkIcon className={"h-5 w-5 m-auto animate-spin"}></LoadingDarkIcon>}
    </button>
  )
}

export default Button;
