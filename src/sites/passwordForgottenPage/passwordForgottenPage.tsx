import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router';
import LogoComponent from '../../components/logo/logoComponent';
import { isEmail } from '../../utils/utility';

function PasswordForgottenPage(): ReactElement {

    const [email, setEmail] = useState('');
    const history = useHistory();
    const [sent, setSent] = useState(false);
    const styles = {
        h3Title: "font-sans text-[34px]",
        content: "text-center flex flex-column justify-center items-center flex-col",
        sentContent: "mb-[50px]",
        notSentContent: "mb-[70px]",
        input: "flex-grow h-16 rounded-xl placeholder-grayscale-dark h-[43px] p-0 pl-4 border-grayscale-dark w-[240px] h-[41px]",
        paragraph: "text-[#4E4B66] mt-[30px] text-[16px] w-[350px] font-sans-roboto",
        inputContainer: "relative flex flex-col my-[40px]",
        inputLabel: "absolute left-[14px] top-[-6px] bg-grayscale-white text-[12px] pl-[4px] pr-[4px]",
        inputUntouched: "pl-6",
        inputContained: "",
        sendBtn: "text-[16px] bg-[#4074B2] h-16 rounded-[8px] text-primary disabled:bg-opacity-50 w-[200px] mb-[40px] text-[#FFFFFF] w-[113px] h-[43px]",
        navigationAnchors: "text-[16px] text-secondary cursor-pointer font-medium",
        sentH3: "",
    }

    const [formTouched, setFormTouched] = useState({
        email: false,
    })

    const formErr: {email: string | null} =
    {
        email: email && !isEmail(email) ? "Valide EMail-Addresse angeben!" : null
    }

    const validForm = () => !formErr['email'];

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
                {!sent && <span className={`${styles.inputContainer}`}>
                    <span className={`${styles.inputLabel} ${email ? "visible" : "hidden"}`}>Email-Addresse:</span>
                    <input type="text" className={`${styles.input} ${email ? styles.inputContained : styles.inputUntouched}`} placeholder="Email-Addresse"
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setFormTouched((oldEle) => ({ ...oldEle, email: true }))}
                        onFocus={() => setFormTouched((oldEle) => ({ ...oldEle, email: false }))}
                    ></input>

                    {formErr['email'] && formTouched.email &&
                        <span className={"text-[#D7382C] absolute bottom-[-20px] left-[17px] text-[12px]"}>{formErr['email']}</span>
                    }
                </span>}


                {
                    sent ?
                        <button className={"mt-[40px] text-grayscale-white bg-secondary w-[215px] h-[50px] rounded-[8px]"}
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
            <div></div>
        </LogoComponent>
    )
}

export default PasswordForgottenPage;
