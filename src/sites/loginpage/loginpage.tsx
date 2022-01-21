import React, { ReactElement, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { signIn } from '../../api/api';
import { ToastContext } from '../../context/ToastContext';
import { isEmail } from '../../utils/utility';
import { v4 as uuidv4 } from 'uuid';
import TextField from '../../components/form/TextField';
import { useInput } from '../../hooks/useInput';
import Button from '../../components/form/Button';
import LoginLayout from '../../layouts/LoginLayout';

function LoginPage(): ReactElement {

    const history = useHistory();

    const { value: email, bind: bindEmail } = useInput("");
    const { value: password, bind: bindPassword } = useInput("");

    const [formTouched, setFormTouched] = useState({
        email: false,
        password: false
    })

    const formErr: { email: string | null, validEmail: string | null, password: string | null } =
    {
        email: !email ? "Die E-Mail-Adresse muss angegeben werden" : null,
        validEmail: email && !isEmail(email) ? "Die E-Mail-Adresse muss valide sein" : null,
        password: !password ? "Das Passwort muss angegeben werden" : null
    }

    const validForm = () => !formErr['email'] && !formErr['validEmail'] && !formErr['password'];

    const styles = {
        container: 'flex flex-col justify-between h-screen py-8',
        logo: 'w-20 self-center',
        headline: 'text-h4',
        form: 'flex flex-col gap-9',
        footer: 'flex gap-16',
        link: 'text-caption text-secondary hover:text-secondary-light active:text-primary'
    }

    const toastContext = useContext(ToastContext);

    const handleSubmit = (evt: React.FormEvent) => {
        if (validForm()) {
            evt.preventDefault();
            signIn(email, password).then(() => {
                history.push('dashboard')
            }).catch((err) =>
                toastContext.setToasts([...toastContext.toasts, { id: uuidv4(), type: "error", headline: "Login fehlgeschlagen!", message: err.message }]));
        }
    }

    const footerLinks = [{ href: "register", content: "Noch keinen Account? Registrieren" }, { href: "passwordForgotten", content: "Passwort Vergessen?" }];

    return (
        <LoginLayout title="Login" links={footerLinks} >
            <form name="login" onSubmit={handleSubmit} className={styles.form}>
                <TextField
                    type="text"
                    name="email"
                    label="E-Mail-Adresse*"
                    onBlur={() => setFormTouched((oldEle) => ({ ...oldEle, email: true }))}
                    {...bindEmail}
                    errorMessage={formTouched.email && formErr['email'] ? formErr['email'] : formTouched.email && formErr['validEmail'] ? formErr['validEmail'] : ""}
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
                <Button type="submit" variant={"primary"} disabled={!validForm()}>Anmelden
                </Button>
            </form>
        </LoginLayout >
    )
}

export default LoginPage;
