import React, {FC} from 'react';

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  variant: ButtonVariant;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({onClick, children, variant,  ...rest}: ButtonProps) => {
  const stylesPrimary = 'disabled:bg-grayscale-dark disabled:text-grayscale-light bg-secondary hover:bg-primary-light active:bg-primary active:outline-none focus:outline-none focus:ring focus:ring-secondary focus:ring-opacity-20 m-5 text-grayscale-light uppercase rounded-lg leading-4 h-[3.125rem] w-[9.375rem] rounded-[40px] tracking-wider';
  const stylesSecondary = 'disabled:border-2 disabled:border-grayscale-dark disabled:text-grayscale-dark border-secondary hover:border-primary-light text-secondary hover:text-primary-light active:border-primary active:text-primary active:outline-none focus:outline-none focus:ring focus:ring-secondary focus:ring-opacity-20 m-5 border-2 uppercase rounded-lg text-grayscale-light leading-4 h-[3.125rem] w-[9.375rem] rounded-[40px] tracking-wider'
  const className = variant === 'primary' ? stylesPrimary : stylesSecondary

  return (
    <button
      onClick={onClick}
      className={`${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button;
