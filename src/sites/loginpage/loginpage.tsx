import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { signIn } from '../../api/api';
import LogoComponent from '../../components/logo/logoComponent';
import { isEmail } from '../../utils/utility';
function LoginPage() {

    const [anchor, setAnchor] = useState('');
    const history = useHistory();

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const [formTouched, setFormTouched] = useState({
        email: false,
        password: false
    })

    const formErr: any =
    {
        email: form.email && !isEmail(form.email) ? "Valide EMail-Addresse angeben!" : null
    }

    const validForm = () => {
        const isValid = Object.keys(formErr).every((key) => !formErr[key]);
        return isValid;

    }

    const [showPW, setShowPW] = useState(false);

    const styles = {
        content: "w-[450px] h-full flex flex-col",
        // logoContainer: 'flex justify-center mt-[30px] mb-[220px]',
        loginContainer: 'h-[280px] w-[240px] ml-auto mr-auto mt-0 mb-[115px]',
        logo: "max-w-[111px] h-[90px] block",
        loginH3: "font-sans text-[34px]",
        inputs: " flex flex-col",
        input: "flex-grow h-16 rounded-xl placeholder-grayscale-dark h-[43px] p-0 pl-4 border-grayscale-dark",
        inputContainer: "relative flex flex-col",
        inputLabel: "absolute left-[14px] top-[-6px] bg-grayscale-white text-[12px] pl-[4px] pr-[4px]",
        eyePassword: "absolute top-[26%] right-[15px] hover:cursor-pointer",
        signInButton: "bg-[#4074B2] h-16 rounded-[8px] text-grayscale-light disabled:bg-opacity-50 h-[43px]",
        footer: "flex text-[#4074B2] justify-between text-[12px] mb-[36px]",
        inputUntouched: "",
        inputContained: "",
        navigationAnchors: "cursor-pointer opacity-60 hover:opacity-100",
        inputUser: 'h-[116px] flex flex-col justify-between mt-[40px] mb-[40px]'
    }

    const login = () => {
        signIn(form.email, form.password).then((data) => {
            history.push('dashboard')
        }).catch((err) => alert(err.message));
    }

    return (
        <LogoComponent>
            {/* <div className={styles.content}> */}
            <div className={styles.loginContainer}>
                <h3 className={styles.loginH3}>Login</h3>
                <div className={styles.inputs}>

                    <div className={styles.inputUser}>
                        <span className={`${styles.inputContainer}`}>

                            <div className={`${styles.inputLabel} ${form.email ? "visible" : "hidden"}`}>Email-Addresse</div>

                            <input type="text" className={`${styles.input} ${form.email ? styles.inputContained : styles.inputUntouched}
                                ${formErr['email'] && 'border-danger'}
                            `} placeholder="Email-Addresse"
                                onChange={(e) => setForm(oldForm => ({ ...oldForm, email: e.target.value }))}
                                onBlur={(e) => setFormTouched((oldEle) => ({ ...oldEle, email: true }))}
                                onFocus={(e) => setFormTouched((oldEle) => ({ ...oldEle, email: false }))}
                            ></input>

                            {formErr['email'] && formTouched.email &&
                                <span className={"text-danger absolute bottom-[-20px] left-[15px] text-[12px]"}>{formErr['email']}</span>
                            }
                        </span>


                        <span className={styles.inputContainer}>
                            <div className={styles.eyePassword}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${showPW ? 'visible' : 'hidden'}`} viewBox="0 0 20 20" fill="currentColor"
                                    onClick={() => setShowPW((oldShowPW) => !oldShowPW)}
                                >
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${!showPW ? 'visible' : 'hidden'}`} viewBox="0 0 20 20" fill="currentColor"
                                    onClick={() => setShowPW((oldShowPW) => !oldShowPW)}
                                >
                                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                </svg>
                            </div>

                            <span className={`${styles.inputLabel} ${form.password ? "visible" : "hidden"} ${formErr['password'] && "text-[#D7382C]"}`}>Passwort:</span>
                            <input type={showPW ? "text" : "password"} className={`${styles.input} ${form.password ? styles.inputContained : styles.inputUntouched}`} placeholder="Passwort"
                                onChange={(e) => setForm(oldForm => ({ ...oldForm, password: e.target.value }))}
                            ></input>

                        </span>
                    </div>
                    <button className={`${styles.signInButton} `} disabled={!form.email || !form.password || !validForm()}
                        onClick={login}
                    >ANMELDEN</button>


                </div>
            </div>
            <footer className={styles.footer}>
                <a className={styles.navigationAnchors} href="/#/register">Noch keinen Account? &nbsp; Registrieren</a>
                <a className={styles.navigationAnchors} href="/#/passwordForgotten">Passwort Vergessen? </a>
            </footer>
            {/* </div> */}

        </LogoComponent>
    )
}

export default LoginPage;
