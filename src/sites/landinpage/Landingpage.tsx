import React, {ReactElement} from 'react';
import Button from "../../components/form/Button";
import LogoComponent from "../../components/logo/logoComponent";
import {useHistory} from "react-router-dom";

function Landingpage(): ReactElement {
    const history = useHistory();
    return (
      <div className="h-full w-full relative">
        <div className={"bg-grayscale-light w-full shadow mb-6 md:mb-12"}>
          <div className="container px-2 mx-auto flex items-center justify-between h-16">
            <h6 className="text-h6">Exxeta iBKM Dashboard</h6>
            <div className={"hidden sm:block md:block"}>
              <Button className="mr-4" variant={"secondary"} onClick={() => history.push('register')}>Registrieren</Button>
              <Button variant={"primary"} onClick={() => history.push('login')}>Login</Button>
            </div>
          </div>
        </div>
        <div className={"w-full"}>
          <div className="container px-2 mx-auto relative flex justify-end">
            <img src="/dashboard-screen.png" className={"rounded-lg shadow-lg lg:w-2/3"}></img>

            <div className="absolute bg-grayscale-light bg-opacity-95 px-6 py-6 left-2 right-2 top-24 md:w-2/3 md:left-0 md:top-1/2 xl:w-1/2 md:transform  rounded-lg shadow-lg">
              <h4 className={"text-2xl lg:text-h4 mb-4"}>Intelligentes Bilanzkreismanagement</h4>
              <p>
                Das Exxeta IBKM Dashboard ermöglicht ein modernes, zeitgemäßes Bilanzkreismanagement.
                Hierbei werden die Kaufentscheidungen von Bilanzkreismanager*innen durch visualisierte, von Machine Learning Modellen erzeugte Progonosedaten über den kommenden Stromverbrauch eines Bilanzkreises unterstützt.
              </p>
              <div className={"mt-6"}>
                <Button className="mr-4" variant={"secondary"} onClick={() => history.push('register')}>Registrieren</Button>
                <Button variant={"primary"} onClick={() => history.push('login')}>Login</Button>
              </div>
            </div>
          </div>
        </div>

        <div className={"w-full absolute bottom-0 md:relative md:mt-12"}>
          <div className="container px-2 mx-auto flex items-center justify-between items-center h-14">
            <LogoComponent><></></LogoComponent>
          </div>
        </div>
      </div>
    );
}

export default Landingpage;
