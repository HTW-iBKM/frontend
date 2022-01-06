import React, {ReactElement, useState} from 'react';
import './Graph.css';
import Tabs from "../tabs/Tabs";
import {Route} from "react-router-dom";

function Menu({setGraph} : any): ReactElement {
    const styles = {
        graphItem: "flex justify-center w-1/3 m-1 rounded-[8px] text-white cursor-pointer",
    };


    return (
        <div className={"w-full flex "}>
            <span>Graph:</span>
            <div className={"flex ml-4"}>
                <div className={"w-[200px] h-[34px] rounded-xl border border-solid border-[#C1C1C6] flex"}>
                    <div className={`${styles.graphItem}`} onClick={() => setGraph("linechart")}>
                        A
                    </div>
                    <div className={`${styles.graphItem}`} onClick={() => setGraph("chartB")}>
                        B
                    </div>
                    <div className={`${styles.graphItem}`} onClick={() => setGraph("chartC")}>
                        C
                    </div>
                </div>
                <div className={"bg-grayscale-light my-3 mx-5 py-3 px-5 rounded-lg shadow-lg"}>
                    <Tabs type="default" tabs={["Tab 1", "Tab 2", "Tab 3"]} panels={[<>Panel 1</>, <>Panel 2</>, <>Panel 3</>]} />
                </div>
            </div>
        </div>
    );
}

export default Menu;
