import React, { useState } from 'react';
import { useHistory } from 'react-router';
import LogoComponent from '../../components/logo/logoComponent';
import { isEmail } from '../../utils/utility';

function PasswordForgottenPage() {

    const [email, setEmail] = useState('');
    const history = useHistory();
    const [sent, setSent] = useState(false);
    const styles = {
        h3Title: "font-sans text-[48px]",
        content: "text-center",
        sentContent: "mt-[240px]",
        notSentContent: "mt-[180px]",
        input: "flex-grow h-16 rounded-2xl placeholder-primary",
        paragraph: "mt-[30px] ",
        inputContainer: "relative flex flex-col my-[40px]",
        inputLabel: "absolute left-[24px] top-[5px]",
        inputUntouched: "p-6",
        inputContained: "pl-6 pt-7",
        sendBtn: "bg-[#4074B2] h-16 rounded-[40px] text-white disabled:bg-opacity-50 w-[200px] mb-[40px]",
        navigationAnchors: "cursor-pointer opacity-60 hover:opacity-100 text-[#4074B2]",
        sentH3: ""
    }

    const formErr: any =
    {
        email: email && !isEmail(email) ? "Valide EMail-Addresse angeben!" : null
    }

    const validForm = () => {
        const isValid = Object.keys(formErr).every((key) => !formErr[key]);
        return isValid;

    }


    return (
        <LogoComponent>
            <div className={`${styles.content} ${sent ? styles.sentContent : styles.notSentContent}`}>
                <h3 className={`${styles.h3Title}`}>

                    {sent ? "E-Mail versendet" :
                        "Passwort setzen"
                    }



                </h3>
                <p className={styles.paragraph}>{sent ?
                    "Eine Email wurde an die angegebene E-Mail-Addresse gesendet. Folge den Anweisungen in der E-Mail,um dein Passwort zurückzusetzen"
                    : "Geben sie ihre Addresse ein und wir helfen Ihnen, ein neues Passwort festzulegen"
                }</p>
                <span className={`${styles.inputContainer}`}>
                    <span className={`${styles.inputLabel} ${email ? "visible" : "hidden"} ${formErr['email'] && "text-[#D7382C]"}`}>Email-Addresse:</span>
                    <input type="text" className={`${styles.input} ${email ? styles.inputContained : styles.inputUntouched}`} placeholder="Email-Addresse"
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>

                    {formErr['email'] &&
                        <span className={"text-[#D7382C] absolute bottom-[-25px] left-[24px]"}>{formErr['email']}</span>
                    }
                </span>


                {
                    sent ?
                        <button className={styles.sendBtn}
                            onClick={() => history.push('/login')}
                        >ZURÜCK ZUM LOGIN</button> :
                        <>
                            <button className={styles.sendBtn} disabled={!email || !validForm()}
                                onClick={() => setSent(true)}
                            >SENDEN</button>
                            <br />
                            <a className={styles.navigationAnchors} href="/#/login">ZURÜCK ZUM LOGIN</a>
                        </>
                }


            </div>
        </LogoComponent>
    )
}

export default PasswordForgottenPage;