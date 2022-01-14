import React, { Ref, useState } from 'react';
import './TextField.css';
import ShowPasswordIcon from "../icons/ShowPasswordIcon";
import HidePasswordIcon from "../icons/HidePasswordIcon";

type TextFieldType = "text" | "password";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type: TextFieldType;
  inputRef?: Ref<HTMLInputElement>;
  defaultValue?: string;
  visibilityButton?: boolean;
  errorMessage?: string;
  successMessage?: string;
  hint?: string;
}

const TextField: React.FC<TextFieldProps> = ({ errorMessage, successMessage, label, name, disabled, type, hint, visibilityButton, inputRef, defaultValue, className, ...rest }: TextFieldProps) => {
  const styles = {
    input: "textfield-input bg-transparent text-grayscale-darkest flex-grow h-13 pl-4 rounded-lg placeholder-primary border-none outline-none ring-2 ring-grayscale-dark focus:outline-none focus:ring-2 focus:ring-secondary disabled:border-2 disabled:bg-grayscale disabled:bg-opacity-50 disabled:border-grayscale-dark",
    inputContainer: "relative flex flex-col max-h-13",
    inputLabel: "absolute pl-4 w-full h-full text-base pointer-events-none text-grayscale-darkest",
    inputLabelSpan: "absolute top-1/4 transition-all duration-300 text-grayscale-dark",
  }

  const [typeState, setTypeState] = useState(type);

  return (
    <div className={`${className} ${styles.inputContainer}`}>

      <input
        id={name}
        className={`${styles.input} ${errorMessage && !disabled && "ring-2 !ring-danger"} ${successMessage && !disabled && "ring-2 !ring-success"}`}
        placeholder={" "}
        disabled={disabled}
        type={typeState}
        ref={inputRef}
        value={defaultValue}
        {...rest}
      />
      <label htmlFor={name} className={`${styles.inputLabel}`}>
        <span className={`${styles.inputLabelSpan}`}>{label}</span>
      </label>

      {visibilityButton &&
        <button className={"absolute right-6 h-full w-6 flex flex-col p"} onClick={() => setTypeState(typeState === 'password' ? 'text' : 'password')}>
          {typeState === "password" &&
            <ShowPasswordIcon className={"absolute h-6 w-6 top-1/2 transform -translate-y-1/2"} />
          }

          {typeState === "text" &&
            <HidePasswordIcon className={"absolute h-6 w-6 top-1/2 transform -translate-y-1/2"} />
          }
        </button>
      }

      {hint && !disabled &&
        <span className={"text-grayscale-darker text-sm absolute top-14 left-4"}>{hint}</span>
      }

      {errorMessage && !disabled &&
        <span className={"text-danger text-sm absolute top-14 left-4"}>{errorMessage}</span>
      }

      {successMessage && !disabled &&
        <span className={"text-success text-sm absolute top-14 left-4"}>{successMessage}</span>
      }
    </div>
  )
}

export default TextField;
