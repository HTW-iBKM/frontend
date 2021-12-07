import React, {useState} from 'react';
import './TextField.css';
import EyeVisibleInactiveIcon from "../icons/EyeVisibileInactiveIcon";

type TextFieldType = "text" | "password";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type: TextFieldType;
  errorMessage?: string;
  successMessage?: string;
}

const TextField: React.FC<TextFieldProps> =({errorMessage, successMessage, label, name, disabled, type, ...rest}: TextFieldProps) => {
  const styles = {
    inputUntouched: "p-6",
    inputContained: "pl-6 pt-7",
    input: "textfield-input flex-grow h-13 pl-6 pt-[1.625rem] rounded-2xl placeholder-primary outline-none focus:outline-none focus:ring-0 disabled:border-2 disabled:border-grayscale-dark",
    inputContainer: "relative flex my-5 flex-col",
    inputLabel: "absolute pl-6 w-full h-full text-base pointer-events-none",
    inputLabelSpan: "absolute top-1/4 transition-all duration-300 text-grayscale-dark",
  }

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className={`${styles.inputContainer}`}>

      <input
        id={name}
        className={`${styles.input} ${errorMessage && "border-2 border-danger"} ${successMessage && "border-2 border-success"}`}
        placeholder={" "}
        disabled={disabled}
        type={type}
        {...rest}
      />
      <label htmlFor={name} className={`${styles.inputLabel}`}>
        <span className={`${styles.inputLabelSpan}`}>{label}</span>
      </label>

      {type === "password" &&
        <button className={"absolute right-6 h-full w-6 flex flex-col p"}>
            <EyeVisibleInactiveIcon className={"absolute h-6 w-6 top-1/2 transform -translate-y-1/2"}></EyeVisibleInactiveIcon>
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
