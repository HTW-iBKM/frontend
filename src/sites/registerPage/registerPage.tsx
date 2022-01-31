import React, { ReactElement, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { signUp } from '../../api/api';
import Button from '../../components/form/Button';
import TextField from '../../components/form/TextField';
import { ToastContext } from '../../context/ToastContext';
import { useInput } from '../../hooks/useInput';
import LoginLayout from '../../layouts/LoginLayout';
import { isEmail } from '../../utils/utility';
import { v4 as uuidv4 } from 'uuid';


function RegisterPage(): ReactElement {

    const history = useHistory();

    const styles = {
        form: 'flex flex-col gap-9'
    }

    const { value: email, bind: bindEmail } = useInput("");
    const { value: firstname, bind: bindFirstname } = useInput("");
    const { value: lastname, bind: bindLastname } = useInput("");
    const { value: password, bind: bindPassword } = useInput("");
    const { value: passwordConfirmed, bind: bindPasswordConfirmed } = useInput("");

    const [formTouched, setFormTouched] = useState({
        firstname: false,
        lastname: false,
        email: false,
        password: false,
        passwordConfirmed: false,
    })

    const specialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    const containsNumbers = /[0-9+]/;

    const formErr: { email: string | null, firstname: string | null, lastname: string | null, password: string | null, passwordConfirmed: string | null } =
    {
        email: !email ? "Die E-Mail-Adresse muss angegeben werden" :
            !isEmail(email) ? "Die E-Mail-Adresse muss valide sein" : null,
        firstname: !firstname ? "Der Vorname muss angegeben werden" :
            containsNumbers.test(firstname) ? "Der Vorname darf keine Zahlen enthalten" :
                firstname.trim().length < 1 ? "Der Vorname muss mindestens drei Buchstaben lang sein" : null,
        lastname: !lastname ? "Der Nachname muss angegeben werden" :
            containsNumbers.test(lastname) ? 'Der Nachname darf keine Zahlen enthalten' :
                lastname.trim().length < 1 ? "Der Nachname muss mindestens drei Buchstaben lang sein" : null,
        password: !password ? "Das Passwort muss angegeben werden" :
            !specialCharacters.test(password) || !containsNumbers.test(password) ? "Das Passwort muss Sonderzeichen und Zahlen enthalten" :
                password.trim().length < 8 ? "Das Passwort muss mindestens acht Zeichen lang sein" : null,
        passwordConfirmed: !passwordConfirmed ? "Das Passwort muss wiederholt werden" :
            passwordConfirmed !== password ? "Die Passwörter müssen übereinstimmen" : null,
    }

    const validForm = () => !formErr['email'] && !formErr['firstname'] && !formErr['lastname'] && !formErr['password'] && !formErr['passwordConfirmed']

    const toastContext = useContext(ToastContext);

    const handleSubmit = (evt: React.FormEvent) => {
        if (validForm()) {
            evt.preventDefault();
            signUp(email, firstname, lastname, password).then(() => {
                history.push('/createdAccount')
            }).catch((err) =>
                toastContext.setToasts([...toastContext.toasts, { id: uuidv4(), type: "error", headline: "Registrierung fehlgeschlagen!", message: err.message }]));
        }
    }

    const footerLinks = [{ href: "login", content: "Bereits registriert? Anmelden" }];

    return (
        <LoginLayout title="Registrierung" links={footerLinks} >
            <form name="login" onSubmit={handleSubmit} className={styles.form}>
                <TextField
                    type="text"
                    name="email"
                    label="E-Mail-Adresse*"
                    onBlur={() => setFormTouched((oldEle) => ({ ...oldEle, email: true }))}
                    {...bindEmail}
                    errorMessage={formTouched.email && formErr['email'] ? formErr['email'] : ""}
                />
                <TextField
                    type="text"
                    name="firstname"
                    label="Vorname*"
                    onBlur={() => setFormTouched((oldEle) => ({ ...oldEle, firstname: true }))}
                    {...bindFirstname}
                    errorMessage={formTouched.firstname && formErr['firstname'] ? formErr['firstname'] : ""}
                />
                <TextField
                    type="text"
                    name="lastname"
                    label="Nachname*"
                    onBlur={() => setFormTouched((oldEle) => ({ ...oldEle, lastname: true }))}
                    {...bindLastname}
                    errorMessage={formTouched.lastname && formErr['lastname'] ? formErr['lastname'] : ""}
                />
                <TextField
                    type="password"
                    name="password"
                    label="Passwort*"
                    visibilityButton={true}
                    onBlur={() => setFormTouched((oldEle) => ({ ...oldEle, password: true }))}
                    {...bindPassword}
                    errorMessage={formTouched.password && formErr['password'] ? formErr['password'] : ""}
                />
                <TextField
                    type="password"
                    name="passwordConfirmed"
                    label="Passwort wiederholen*"
                    visibilityButton={true}
                    onBlur={() => setFormTouched((oldEle) => ({ ...oldEle, passwordConfirmed: true }))}
                    {...bindPasswordConfirmed}
                    errorMessage={formTouched.passwordConfirmed && formErr['passwordConfirmed'] ? formErr['passwordConfirmed'] : ""}
                />
                <Button type="submit" variant={"primary"} disabled={!validForm()}>Anmelden
                </Button>
            </form>
        </LoginLayout >
    )
}

export default RegisterPage;
