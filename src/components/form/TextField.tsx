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
}

const TextField: React.FC<TextFieldProps> =({errorMessage, successMessage, label, name, disabled, type, visibilityButton, ...rest}: TextFieldProps) => {
  const styles = {
    inputUntouched: "p-6",
    inputContained: "pl-6 pt-7",
    input: "textfield-input flex-grow h-13 pl-6 rounded-2xl placeholder-primary outline-none focus:outline-none focus:ring-0 disabled:border-2 disabled:border-grayscale-dark",
    inputContainer: "relative flex my-5 flex-col",
    inputLabel: "absolute pl-6 w-full h-full text-base pointer-events-none",
    inputLabelSpan: "absolute top-1/4 transition-all duration-300 text-grayscale-dark",
  }

  const [typeState, setTypeState] = useState(type);

  return (
    <div className={`${styles.inputContainer}`}>

      <input
        id={name}
        className={`${styles.input} ${errorMessage && "border-2 border-danger"} ${successMessage && "border-2 border-success"}`}
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
            <ShowPasswordIcon className={"absolute h-6 w-6 top-1/2 transform -translate-y-1/2"}></ShowPasswordIcon>
          }

          {typeState === "text" &&
            <HidePasswordIcon className={"absolute h-6 w-6 top-1/2 transform -translate-y-1/2"}></HidePasswordIcon>
          }
        </button>
      }

      {errorMessage && !disabled &&
        <span className={"text-danger absolute bottom-[-25px] left-[24px]"}>{errorMessage}</span>
      }

      {successMessage && !disabled &&
        <span className={"text-success absolute bottom-[-25px] left-[24px]"}>{successMessage}</span>
      }
    </div>
  )
}

export default TextField;
