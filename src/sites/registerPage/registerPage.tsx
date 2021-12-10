import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { signUp } from '../../api/api';
import LogoComponent from '../../components/logo/logoComponent';
import { isEmail } from '../../utils/utility';


function RegisterPage() {
    const [form, setForm] = useState({
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        passwordConfirm: ""
    })

    const history = useHistory();

    const [showPW, setShowPW] = useState(false);
    const [showPWConfirm, setShowPWConfirm] = useState(false);
    const styles = {
        h3Title: "font-sans text-[34px] ",
        content: "",
        input: "flex-grow h-16 rounded-xl placeholder-grayscale-dark h-[43px] p-0 pl-4 border-grayscale-dark",
        inputContainer: "relative flex my-[33px] flex-col mt-[50px]",
        inputLabel: "absolute left-[14px] top-[-6px] bg-grayscale-white text-[12px] pl-[4px] pr-[4px]",
        inputUntouched: "pl-6",
        inputContained: "pl-6",
        footer: "flex text-[#4074B2] mt-[100px] text-[12px] justify-center mb-[36px]",
        eyePassword: "absolute top-[26%] right-[15px] hover:cursor-pointer",
        navigationAnchors: "cursor-pointer opacity-60 hover:opacity-100",
        registerButton: "mt-[25px] bg-[#4074B2] h-16 rounded-[8px] text-white disabled:bg-opacity-50 w-full w-[240px] h-[43px] text-grayscale-white text-[16px]",
        form: 'w-[240px] mt-0 mb-[150px] ml-auto mr-auto flex-grow',
        errLabel: (string: any) => {
            return (`text-danger absolute text-[12px] ${string.split(' ').length > 5 ? 'bottom-[-33px] left-[18px]' : 'bottom-[-25px] left-[24px]'}`)
        },
    }

    const [formTouched, setFormTouched] = useState({
        firstname: false,
        lastname: false,
        email: false,
        password: false,
        passwordConfirm: false,
    })

    const specialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    const containsNumbers = /[0-9+]/;
    const formErr: any =
    {
        email: formTouched.email && !form.email.trim() ? "Die Email muss definiert werden" :
            form.email.trim() && !isEmail(form.email.trim()) ? "Valide EMail-Addresse angeben" : null,
        firstname: formTouched.firstname && !form.firstname.trim() ? "Der Vorname muss definiert werden" :
            formTouched.firstname && form.firstname.match(/[0-9+]/) ? 'Der Vorname darf keine Zahlen enthalten' :
                form.firstname.trim() && form.firstname.trim().length < 1 ? "Der Vorname muss mindestens drei Buchstaben haben  " : null,
        lastname: formTouched.lastname && !form.lastname.trim() ? "Der Nachname muss definiert werden" :
            formTouched.lastname && containsNumbers.test(form.lastname) ? 'Der Nachname darf keine Zahlen enthalten' :
                form.lastname && form.lastname.trim().length < 1 ? "Der Nachname muss mindestens drei Buchstaben haben" : null,
        password: formTouched.password && !form.password.trim() ? "Das Passwort muss definiert werden" :
            formTouched.password && !specialCharacters.test(form.password) || !containsNumbers.test(form.password) ? "Dass Passwort muss ein Sonderzeichen enthalten und eine Zahl enthalen" :
                form.password.trim() && form.password.trim().length < 8 ? "Passwort muss mindestens acht Zeichen enthalten" : null,
        passwordConfirm: formTouched.passwordConfirm && !form.passwordConfirm.trim() ? "Das Wiederholungs-Passwort muss definiert werden" :
            form.passwordConfirm.trim() && form.passwordConfirm.trim() !== form.password.trim() ? "Passwörter müssen übereinstimmen" : null,
    }

    const validForm = () => {
        const isValid = Object.keys(formErr).every((key) => !formErr[key]);
        return isValid;

    }

    const register = () => {
        signUp(form.email, form.firstname, form.lastname, form.password).then(() => {
            history.push('/createdAccount')
        }).catch(err => alert(err))
    }

    return (
        <LogoComponent>
            <div className={styles.content}>

                <div className={styles.form}>
                    <h3 className={styles.h3Title}>
                        Registrierung
                    </h3>
                    <span className={`${styles.inputContainer}`}>

                        <span className={`${styles.inputLabel} ${form.email ? "visible" : "hidden"}`}>Email-Addresse:</span>

                        <input type="text" className={`${styles.input} ${form.email ? styles.inputContained : styles.inputUntouched}
                                 ${formErr['email'] && 'border-danger'}
                        
                        `} placeholder="Email-Addresse"
                            onChange={(e) => setForm(oldForm => ({ ...oldForm, email: e.target.value }))}
                            onFocus={() => setFormTouched((oldFormTouch) => ({ ...oldFormTouch, email: false }))}
                            onBlur={() => setFormTouched((oldFormTouch) => ({ ...oldFormTouch, email: true }))}
                        ></input>

                        {formErr['email'] && formTouched.email &&
                            <span className={styles.errLabel(formErr['email'])}>{formErr['email']}</span>
                        }
                    </span>

                    <span className={`${styles.inputContainer}`}>
                        <span className={`${styles.inputLabel} ${form.firstname ? "visible" : "hidden"} ${formErr['firstname'] && "text-[#D7382C]"}`}>Vorname:</span>
                        <input type="text" className={`${styles.input} ${form.firstname ? styles.inputContained : styles.inputUntouched}`} placeholder="Vorname"
                            onChange={(e) => setForm(oldForm => ({ ...oldForm, firstname: e.target.value }))}
                            onFocus={() => setFormTouched((oldFormTouch) => ({ ...oldFormTouch, firstname: false }))}
                            onBlur={() => setFormTouched((oldFormTouch) => ({ ...oldFormTouch, firstname: true }))}
                        ></input>

                        {formErr['firstname'] && formTouched['firstname'] &&
                            <span className={styles.errLabel(formErr['firstname'])}>{formErr['firstname']}</span>
                        }
                    </span>

                    <span className={`${styles.inputContainer}`}>

                        <span className={`${styles.inputLabel} ${form.lastname ? "visible" : "hidden"} ${formErr['lastname'] && "text-[#D7382C]"}`}>Nachname:</span>

                        <input type="text" className={`${styles.input} ${form.lastname ? styles.inputContained : styles.inputUntouched}`} placeholder="Nachname"
                            onChange={(e) => setForm(oldForm => ({ ...oldForm, lastname: e.target.value }))}
                            onFocus={() => setFormTouched((oldFormTouch) => ({ ...oldFormTouch, lastname: false }))}
                            onBlur={() => setFormTouched((oldFormTouch) => ({ ...oldFormTouch, lastname: true }))}
                        ></input>

                        {formErr['lastname'] && formTouched['lastname'] &&
                            <span className={styles.errLabel(formErr['lastname'])}>{formErr['lastname']}</span>
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

                        <span className={`${styles.inputLabel} ${form.password ? "visible" : "hidden"}`}>Passwort:</span>
                        <input type={showPW ? "text" : "password"} className={`${styles.input} ${form.password ? styles.inputContained : styles.inputUntouched}`} placeholder="Passwort"
                            onChange={(e) => setForm(oldForm => ({ ...oldForm, password: e.target.value }))}
                            onFocus={() => setFormTouched((oldFormTouch) => ({ ...oldFormTouch, password: false }))}
                            onBlur={() => setFormTouched((oldFormTouch) => ({ ...oldFormTouch, password: true }))}

                        ></input>
                        {formErr['password'] && formTouched['password'] &&
                            <span className={styles.errLabel(formErr['password'])}>{formErr['password']}</span>
                        }
                    </span>


                    <span className={styles.inputContainer}>
                        <div className={styles.eyePassword}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${showPWConfirm ? 'visible' : 'hidden'}`} viewBox="0 0 20 20" fill="currentColor"
                                onClick={() => setShowPWConfirm((oldShowPW) => !oldShowPW)}
                            >
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${!showPWConfirm ? 'visible' : 'hidden'}`} viewBox="0 0 20 20" fill="currentColor"
                                onClick={() => setShowPWConfirm((oldShowPW) => !oldShowPW)}
                            >
                                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>
                        </div>

                        <span className={`${styles.inputLabel} ${form.passwordConfirm ? "visible" : "hidden"}`}>Passwort wiederholen:</span>
                        <input type={showPWConfirm ? "text" : "password"} className={`${styles.input} ${form.passwordConfirm ? styles.inputContained : styles.inputUntouched}`} placeholder="Passwort wiederholen"
                            onChange={(e) => setForm(oldForm => ({ ...oldForm, passwordConfirm: e.target.value }))}
                            onFocus={() => setFormTouched((oldFormTouch) => ({ ...oldFormTouch, passwordConfirm: false }))}
                            onBlur={() => setFormTouched((oldFormTouch) => ({ ...oldFormTouch, passwordConfirm: true }))}
                        ></input>
                        {formErr['passwordConfirm']
                            && formTouched.passwordConfirm &&
                            <span className={styles.errLabel(formErr['passwordConfirm'])}>{formErr['passwordConfirm']}</span>
                        }
                    </span>
                    <button className={styles.registerButton} disabled={
                        !form.email || !form.password || !form.firstname || !form.lastname || !form.password || !form.passwordConfirm || !validForm()}
                        onClick={register}
                    >REGISTRIEREN</button>
                </div>


                <footer className={styles.footer}>
                    <a className={styles.navigationAnchors} href="/#/login">Bereits registriert? &nbsp; Anmelden</a>
                </footer>

            </div>
        </LogoComponent>
    )
}

export default RegisterPage;