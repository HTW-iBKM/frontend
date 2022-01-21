import React, { ReactElement } from 'react';
import { useHistory } from 'react-router';
import Button from '../../components/form/Button';
import LoginLayout from '../../layouts/LoginLayout';


export default function CreatedAccountPage(): ReactElement {
    const history = useHistory();
    const styles = {
        logo: "w-20 self-center",
        backToLoginButton: "my-10",
        contentWrapper: "flex flex-col",
        textCentered: "text-center",

        h3Title: "font-sans text-[48px]",
        content: "text-center mt-[240px]",
        sentContent: "",
        paragraph: "my-[40px] ",
        sendBtn: "bg-[#4074B2] h-16 rounded-[40px] text-white disabled:bg-opacity-50 w-[200px] mb-[40px]",

    }


    return (
        <LoginLayout
            title={"Account erstellt"}
            centerTitle={true}
        ><div className={styles.contentWrapper}>
                <div className={styles.textCentered}>
                    Sie haben erfolgreich einen neuen Account bei iBKM erstellt. Sie müssen nun ihren Account über ihre E-Mail verifizieren, sodass Sie die Plattform nutzen können.
                    Anschließend können Sie sich mit Ihren Daten einloggen.
                </div>
                <Button
                    className={styles.backToLoginButton}
                    variant="primary"
                    onClick={() => history.push("/login")}
                >
                    Zurück zum Login
                </Button></div>
        </LoginLayout >
    )
}
