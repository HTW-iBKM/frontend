import React, { ReactElement } from 'react';



function LogoComponent({ children }: {children: ReactElement | ReactElement[]}): ReactElement {
    const styles = {
        wrapper: "w-full h-full bg-white flex justify-center",
        logo: "max-w-[111px] h-[90px] block mt-[20px]",
        content: "w-[450px] h-full flex flex-col justify-between",
        logoContainer: 'flex justify-center',
    }

    return (<div className={styles.wrapper}>
        <div className={styles.content}>
            <div className={styles.logoContainer}>
                <img src="/exxetalogo.png" className={styles.logo} ></img>
            </div>
            {children}
        </div>
    </div>
    )
}

export default LogoComponent;
