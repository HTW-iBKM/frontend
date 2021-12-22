import React, {ReactElement, useState} from 'react';
import './Graph.css';

function Menu(): ReactElement {
    const styles = {
        graphItem: "flex justify-center w-1/3 m-1 rounded-[8px] text-white cursor-pointer",
    };


    return (
        <div className={"flex items-center"}>
            <span>Graph:</span>
            <div className={"flex ml-4"}>
                <div className={"w-[200px] h-[34px] rounded-xl border border-solid border-[#C1C1C6] flex"}>
                    <div className={`${styles.graphItem}`}>
                        A
                    </div>
                    <div className={`${styles.graphItem}`}>
                        B
                    </div>
                    <div className={`${styles.graphItem}`}>
                        C
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Menu;
