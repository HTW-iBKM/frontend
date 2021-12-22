import React, { ReactElement } from 'react';
import { useHistory } from 'react-router';
import LogoComponent from '../../components/logo/logoComponent';


export default function CreatedAccountPage(): ReactElement {
    const history = useHistory();
    const styles = {
        h3Title: "font-sans text-[48px]",
        content: "text-center mt-[240px]",
        sentContent: "",
        paragraph: "my-[40px] ",
        sendBtn: "bg-[#4074B2] h-16 rounded-[40px] text-white disabled:bg-opacity-50 w-[200px] mb-[40px]",
        
    }


    return (
        <LogoComponent>
            <div className={`${styles.content}`}>
                <h3 className={`${styles.h3Title}`}>
                    Account erstellt

                </h3>
                <p className={styles.paragraph}>Sie haben erfolgreich einen neuen Account bei iBKM erstellt. Loggen sie sich nun mit Ihren Daten ein.</p>

                <button className={styles.sendBtn}
                    onClick={() => history.push('/login')}
                >ZURÜCK ZUM LOGIN</button>
            </div>
        </LogoComponent>
    )
}
