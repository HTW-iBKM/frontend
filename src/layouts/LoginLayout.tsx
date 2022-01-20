import React, {ReactElement} from "react";
import ToastContainer from "../components/toast/ToastContainer";

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
        logo: "w-20 self-center",
        headline: "text-h4",
        headlineCenterAlign: "text-h4 text-center",
        footer: "flex gap-8 justify-evenly",
        link: "text-caption text-secondary hover:text-secondary-light active:text-primary",
        childrenWrapper: "my-10"
    };

    return (
        <div className={styles.container}>
            <ToastContainer />
            <img src="/exxetalogo.png" className={styles.logo}></img>
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
                        <a key={link.content} href={link.href} className={styles.link}>
                            {link.content}
                        </a>
                    ))}
            </footer>
        </div>
    );
};

export default LoginLayout;
