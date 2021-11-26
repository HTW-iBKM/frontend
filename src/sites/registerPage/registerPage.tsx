import React, { useState } from 'react';
import { useHistory } from 'react-router';
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
        h3Title: "font-sans text-[48px]",
        content: "mt-[85px]",
        input: "flex-grow h-16 rounded-2xl placeholder-primary",
        inputContainer: "relative flex my-[33px] flex-col",
        inputLabel: "absolute left-[24px] top-[5px]",
        inputUntouched: "p-6",
        inputContained: "pl-6 pt-7",
        footer: "flex text-[#4074B2] mt-[100px] text-[12px] justify-center",
        eyePassword: "absolute top-[22px] right-[21px]",
        navigationAnchors: "cursor-pointer opacity-60 hover:opacity-100",
        registerButton: "mt-[25px] bg-[#4074B2] h-16 rounded-[40px] text-white disabled:bg-opacity-50 w-full",
    }

    const [formTouched, setFormTouched] = useState({
        firstname: false,
        lastname: false,
        email: false,
        password: false,
        passwordConfirm: false,
    })


    const formErr: any =
    {
        email: formTouched.email && !form.email.trim() ? "Die Email muss definiert werden!" :
            form.email.trim() && !isEmail(form.email.trim()) ? "Valide EMail-Addresse angeben!" : null,
        firstname: formTouched.firstname && !form.firstname.trim() ? "Der Vorname muss definiert werden!" :
            form.firstname.trim() && form.firstname.trim().length < 3 ? "Der Vorname muss mindestens drei Buchstaben haben  " : null,
        lastname: formTouched.lastname && !form.lastname.trim() ? "Der Nachname muss definiert werden!" :
            form.lastname && form.lastname.trim().length < 3 ? "Der Nachname muss mindestens drei Buchstaben haben" : null,
        password: formTouched.password && !form.password.trim() ? "Das Passwort muss definiert werden!" :
            form.password.trim() && form.password.trim().length < 5 ? "Passwort muss mindestens fünf Zeichen enthalten" : null,
        passwordConfirm: formTouched.passwordConfirm && !form.passwordConfirm.trim() ? "Das Wiederholungs-Passwort muss definiert werden!" :
            form.passwordConfirm.trim() && form.passwordConfirm.trim() !== form.password.trim() ? "Passwörter müssen übereinstimmen!" : null,
    }

    const validForm = () => {
        const isValid = Object.keys(formErr).every((key) => !formErr[key]);
        return isValid;

    }

    return (
        <LogoComponent>
            <div className={styles.content}>
                <h3 className={styles.h3Title}>
                    Registrierung
                </h3>
                <div>
                    <span className={`${styles.inputContainer}`}>

                        <span className={`${styles.inputLabel} ${form.email ? "visible" : "hidden"} ${formErr['email'] && "text-[#D7382C]"}`}>Email-Addresse:</span>

                        <input type="text" className={`${styles.input} ${form.email ? styles.inputContained : styles.inputUntouched}`} placeholder="Email-Addresse"
                            onChange={(e) => setForm(oldForm => ({ ...oldForm, email: e.target.value }))}
                            onFocus={() => setFormTouched((oldFormTouch) => ({ ...oldFormTouch, email: true }))}
                        ></input>

                        {formErr['email'] &&
                            <span className={"text-[#D7382C] absolute bottom-[-25px] left-[24px]"}>{formErr['email']}</span>
                        }
                    </span>

                    <span className={`${styles.inputContainer}`}>
                        <span className={`${styles.inputLabel} ${form.firstname ? "visible" : "hidden"} ${formErr['firstname'] && "text-[#D7382C]"}`}>Vorname:</span>
                        <input type="text" className={`${styles.input} ${form.firstname ? styles.inputContained : styles.inputUntouched}`} placeholder="Vorname"
                            onChange={(e) => setForm(oldForm => ({ ...oldForm, firstname: e.target.value }))}
                            onFocus={() => setFormTouched((oldFormTouch) => ({ ...oldFormTouch, firstname: true }))}
                        ></input>

                        {formErr['firstname'] &&
                            <span className={"text-[#D7382C] absolute bottom-[-25px] left-[24px]"}>{formErr['firstname']}</span>
                        }
                    </span>

                    <span className={`${styles.inputContainer}`}>

                        <span className={`${styles.inputLabel} ${form.lastname ? "visible" : "hidden"} ${formErr['lastname'] && "text-[#D7382C]"}`}>Nachname:</span>

                        <input type="text" className={`${styles.input} ${form.lastname ? styles.inputContained : styles.inputUntouched}`} placeholder="Nachname"
                            onChange={(e) => setForm(oldForm => ({ ...oldForm, lastname: e.target.value }))}
                            onFocus={() => setFormTouched((oldFormTouch) => ({ ...oldFormTouch, lastname: true }))}
                        ></input>

                        {formErr['lastname'] &&
                            <span className={"text-[#D7382C] absolute bottom-[-25px] left-[24px]"}>{formErr['lastname']}</span>
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

                            onFocus={() => setFormTouched((oldFormTouch) => ({ ...oldFormTouch, password: true }))}
                        ></input>
                        {formErr['password'] &&
                            <span className={"text-[#D7382C] absolute bottom-[-25px] left-[24px]"}>{formErr['password']}</span>
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

                        <span className={`${styles.inputLabel} ${form.passwordConfirm ? "visible" : "hidden"} ${formErr['passwordConfirm'] && "text-[#D7382C]"}`}>Passwort wiederholen:</span>
                        <input type={showPWConfirm ? "text" : "password"} className={`${styles.input} ${form.passwordConfirm ? styles.inputContained : styles.inputUntouched}`} placeholder="Passwort wiederholen"
                            onChange={(e) => setForm(oldForm => ({ ...oldForm, passwordConfirm: e.target.value }))}
                            onFocus={() => setFormTouched((oldFormTouch) => ({ ...oldFormTouch, passwordConfirm: true }))}
                        ></input>
                        {formErr['passwordConfirm'] &&
                            <span className={"text-[#D7382C] absolute bottom-[-25px] left-[24px]"}>{formErr['passwordConfirm']}</span>
                        }
                    </span>
                </div>
                <button className={styles.registerButton} disabled={
                    !form.email || !form.password || !form.firstname || !form.lastname || !form.password || !form.passwordConfirm || !validForm()}
                    onClick={() => history.push('/createdAccount')}
                    >REGISTRIEREN</button>

                <footer className={styles.footer}>
                    <a className={styles.navigationAnchors} href="/#/login">Bereits registriert? &nbsp; Anmelden</a>
                </footer>

            </div>
        </LogoComponent>
    )
}

export default RegisterPage;