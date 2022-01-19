import React, { ReactElement, useState } from "react";
import { useHistory } from "react-router";
import Button from "../../components/form/Button";
import TextField from "../../components/form/TextField";
import { useInput } from "../../hooks/useInput";
import LoginLayout from "../../layouts/LoginLayout";
import { isEmail } from "../../utils/utility";

function PasswordForgottenPage(): ReactElement {
    const history = useHistory();
    const [recoveryEmailSent, setRecoveryEmailSent] = useState(false);
    const styles = {
        textCentered: "text-center",
        contentWrapper: "flex flex-col",
        form: "flex flex-col gap-9 my-10",
        backToLoginButton: "my-10",
    };

    const { value: email, bind: bindEmail } = useInput("");

    const [formTouched, setFormTouched] = useState({
        email: false,
    });

    const formErr: { email: string | null; validEmail: string | null } = {
        email: !email ? "Die E-Mail-Adresse muss angegeben werden" : null,
        validEmail:
            email && !isEmail(email) ? "Die E-Mail-Adresse muss valide sein" : null,
    };

    const validForm = () => !formErr["email"] && !formErr["validEmail"];

    return (
        <LoginLayout
            title={recoveryEmailSent ? "E-Mail versendet" : "Passwort zurücksetzen"}
            centerTitle={true}
        >
            {recoveryEmailSent ? (
                <div className={styles.contentWrapper}>
                    <div className={styles.textCentered}>
                        Eine Nachricht wurde an die angegebene E-Mail-Adresse gesendet.
                        Bitte folgen Sie den Anweisungen in der E-Mail, um das Passwort
                        zurückzusetzen
                    </div>
                    <Button
                        className={styles.backToLoginButton}
                        variant="primary"
                        onClick={() => history.push("/login")}
                    >
                        Zurück zum Login
                    </Button>
                </div>
            ) : (
                <div className={styles.contentWrapper}>
                    <div className={styles.textCentered}>
                        Geben sie ihre E-Mail-Adresse ein und wir helfen Ihnen, ein neues
                        Passwort festzulegen
                    </div>
                    <form
                        name="resetPassword"
                        onSubmit={() => setRecoveryEmailSent(true)}
                        className={styles.form}
                    >
                        <TextField
                            type="text"
                            name="email"
                            label="E-Mail-Adresse*"
                            onBlur={() =>
                                setFormTouched((oldEle) => ({ ...oldEle, email: true }))
                            }
                            {...bindEmail}
                            errorMessage={
                                formTouched.email && formErr["email"]
                                    ? formErr["email"]
                                    : formTouched.email && formErr["validEmail"]
                                        ? formErr["validEmail"]
                                        : ""
                            }
                        />
                        <Button type="submit" variant="primary" disabled={!validForm()}>
                            Senden
                        </Button>
                    </form>
                    <Button variant="text" onClick={() => history.push("/login")}>
                        Zurück zum Login
                    </Button>
                </div>
            )}
        </LoginLayout>
    );
}

export default PasswordForgottenPage;
