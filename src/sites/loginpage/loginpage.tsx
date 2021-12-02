import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { singIn } from '../../api/api';
import LogoComponent from '../../components/logo/logoComponent';
import { isEmail } from '../../utils/utility';
function LoginPage() {

    const [anchor, setAnchor] = useState('');
    const history = useHistory();

    const [form, setForm] = useState({
        email: "",
        password: ""
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
        loginContainer: 'mt-[220px]',
        logo: "max-w-[111px] h-[90px] block",
        loginH3: "font-sans text-[48px]",
        inputs: "mt-[15px] flex flex-col",
        input: "flex-grow h-16 rounded-2xl placeholder-primary",
        inputContainer: "relative flex my-[20px] flex-col",
        inputLabel: "absolute left-[24px] top-[5px]",
        eyePassword: "absolute top-[22px] right-[21px]",
        signInButton: "mt-[25px] bg-[#4074B2] h-16 rounded-[40px] text-white disabled:bg-opacity-50",
        footer: "flex text-[#4074B2] mt-[277px] justify-between text-[12px]",
        inputUntouched: "p-6",
        inputContained: "pl-6 pt-7",
        navigationAnchors: "cursor-pointer opacity-60 hover:opacity-100"
    }

    const login = () => {
        singIn(form.email, form.password).then(() => {
            history.push('graph-test')
        }).catch((err) => alert(err.message));
    }

    return (
        <LogoComponent>
            {/* <div className={styles.content}> */}
            <div className={styles.loginContainer}>
                <h3 className={styles.loginH3}>Login</h3>
                <div className={styles.inputs}>

                    <span className={`${styles.inputContainer}`}>

                        <span className={`${styles.inputLabel} ${form.email ? "visible" : "hidden"} ${formErr['email'] && "text-[#D7382C]"}`}>Email-Addresse:</span>

                        <input type="text" className={`${styles.input} ${form.email ? styles.inputContained : styles.inputUntouched}`} placeholder="Email-Addresse"
                            onChange={(e) => setForm(oldForm => ({ ...oldForm, email: e.target.value }))}
                        ></input>

                        {formErr['email'] &&
                            <span className={"text-[#D7382C] absolute bottom-[-25px] left-[24px]"}>{formErr['email']}</span>
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

                    <button className={styles.signInButton} disabled={!form.email || !form.password || !validForm()}
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