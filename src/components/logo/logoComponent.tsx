import React from 'react';



function LogoComponent({ children }: any) {
    const styles = {
        wrapper: "w-full h-full bg-white flex justify-center",
        logo: "max-w-[111px] h-[90px] block",
        content: "w-[450px] h-full flex flex-col",
        logoContainer: 'flex justify-center mt-[30px]',
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
