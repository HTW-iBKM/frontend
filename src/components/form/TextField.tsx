import React, {useState} from 'react';
import './TextField.css';
import ShowPasswordIcon from "../icons/ShowPasswordIcon";
import HidePasswordIcon from "../icons/HidePasswordIcon";

type TextFieldType = "text" | "password";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type: TextFieldType;
  visibilityButton?: boolean;
  errorMessage?: string;
  successMessage?: string;
  hint?: string;
}

const TextField: React.FC<TextFieldProps> =({errorMessage, successMessage, label, name, disabled, type, hint, visibilityButton, ...rest}: TextFieldProps) => {
  const styles = {
    input: "textfield-input bg-transparent text-grayscale-darkest flex-grow h-13 pl-4 rounded-lg placeholder-primary outline-none border-2 border-grayscale-dark focus:outline-none disabled:border-2 disabled-bg-grayscale-dark disabled:border-grayscale-dark",
    inputContainer: "relative flex my-5 flex-col",
    inputLabel: "absolute pl-4 w-full h-full text-base pointer-events-none text-grayscale-darkest",
    inputLabelSpan: "absolute top-1/4 transition-all duration-300 text-grayscale-dark",
  }

  const [typeState, setTypeState] = useState(type);

  return (
    <div className={`${styles.inputContainer}`}>

      <input
        id={name}
        className={`${styles.input} ${errorMessage && "border-2 !border-danger"} ${successMessage && !disabled && "border-2 !border-success"}`}
        placeholder={" "}
        disabled={disabled}
        type={typeState}
        {...rest}
      />
      <label htmlFor={name} className={`${styles.inputLabel}`}>
        <span className={`${styles.inputLabelSpan}`}>{label}</span>
      </label>

      {visibilityButton &&
        <button className={"absolute right-6 h-full w-6 flex flex-col p"} onClick={() => setTypeState(typeState === 'password' ? 'text' : 'password')}>
          {typeState === "password" &&
            <ShowPasswordIcon className={"absolute h-6 w-6 top-1/2 transform -translate-y-1/2"}/>
          }

          {typeState === "text" &&
            <HidePasswordIcon className={"absolute h-6 w-6 top-1/2 transform -translate-y-1/2"}/>
          }
        </button>
      }

      {hint && !disabled &&
      <span className={"text-grayscale-darker absolute -bottom-6 left-4"}>{hint}</span>
      }

      {errorMessage && !disabled &&
        <span className={"text-danger absolute -bottom-6 left-4"}>{errorMessage}</span>
      }

      {successMessage && !disabled &&
        <span className={"text-success absolute -bottom-6 left-4"}>{successMessage}</span>
      }
    </div>
  )
}

export default TextField;
