import React, { ReactElement } from "react";
import ToastContainer from "../components/toast/ToastContainer";
import { useHistory } from "react-router-dom";
import ExxetaLogo from "../components/icons/ExxetaLogo";

interface FooterLink {
    href: string;
    content: string;
}

interface LoginLayoutProps {
    children: React.ReactNode;
    title: string;
    centerTitle?: boolean;
    links?: FooterLink[];
}

const LoginLayout = ({
    children,
    title,
    centerTitle,
    links,
}: LoginLayoutProps): ReactElement => {
    const styles = {
        container: "flex flex-col justify-between h-screen py-8 max-w-sm w-6/12 min-w-[200px]",
        logo: "overflow-visible w-20 m-2 self-center",
        headline: "text-h4",
        headlineCenterAlign: "text-h4 text-center",
        footer: "flex gap-8 justify-evenly",
        link: "text-caption text-secondary hover:text-secondary-light active:text-primary cursor-pointer",
        childrenWrapper: "my-10"
    };

    const history = useHistory();

    return (
        <div className={styles.container}>
            <ToastContainer />
            <ExxetaLogo className={styles.logo} />
            <div>
                <h4
                    className={centerTitle ? styles.headlineCenterAlign : styles.headline}
                >
                    {title}
                </h4>
                <div className={styles.childrenWrapper}>{children}</div>
            </div>
            <footer className={styles.footer}>
                {links &&
                    links.map((link) => (
                        <a key={link.content} onClick={() => history.push(link.href)} className={styles.link}>
                            {link.content}
                        </a>
                    ))}
            </footer>
        </div>
    );
};

export default LoginLayout;
