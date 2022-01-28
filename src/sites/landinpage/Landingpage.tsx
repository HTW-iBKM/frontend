import React, { Fragment, ReactElement, useState } from 'react';
import Button from "../../components/form/Button";
import { Transition } from "@headlessui/react";
import { useHistory } from "react-router-dom";
import "./Landingpage.css";
import CloseIcon from "../../components/icons/CloseIcon";
import auth from "../../services/Auth";
import ExxetaLogo from '../../components/icons/ExxetaLogo';

function Landingpage(): ReactElement {
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const isAuthenticated = auth.isAuthenticated();

  return (
    <div className="w-full h-full relative">
      <div className={"lp-background-clip pointer-events-none absolute inset-0 bg-secondary-light bg-opacity-20"}></div>

      {/*Mobile Menu */}
      <Transition
        as={Fragment}
        show={isMenuOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className={"fixed inset-0 bg-grayscale-light md:bg-transparent z-50 md:relative block md:hidden"}>
          <div className={"h-full w-full flex flex-col px-8 justify-center relative md:flex-row md:px-0"}>
            <Button variant={"icon"} className={"absolute top-6 right-6 h-10 w-10 inline-block md:hidden"} onClick={() => setIsMenuOpen(false)}>
              <CloseIcon></CloseIcon>
            </Button>
            <Button className="mb-4" variant={"text"} onClick={() => history.push('Einloggen')}>Über uns</Button>
            <Button className="mb-4" variant={"text"} onClick={() => history.push('Einloggen')}>Kontakt</Button>
            <Button variant={"secondary"} onClick={() => history.push('login')}>Einloggen</Button>
          </div>
        </div>
      </Transition>

      {/* Header */}

      <div className={"w-full h-full"}>
        <div className={"w-full mb-6 md:mb-10"}>
          <div className="container px-8 py-8 mx-auto flex items-center justify-between">
            <h5 className="text-h5 flex flex-col md:flex-row items-start md:items-center">
              <ExxetaLogo className="overflow-visible w-20 ml-1 mr-4" />
              iBKM
            </h5>

            <div className={"hidden md:block"}>
              <Button className="mr-6" variant={"text"} onClick={() => history.push('Einloggen')}>Über uns</Button>
              <Button className="mr-6" variant={"text"} onClick={() => history.push('Einloggen')}>Kontakt</Button>
              {isAuthenticated
                ? <Button variant={"secondary"} onClick={() => history.push('dashboard')}>Zum Dashboard</Button>
                : <Button variant={"secondary"} onClick={() => history.push('login')}>Einloggen</Button>
              }

            </div>

            <Button variant={"text"} className={"inline-block md:hidden"} onClick={() => setIsMenuOpen(true)}>Menü</Button>
          </div>
        </div>
        <div className={"w-full"}>
          <div className="container px-8 mx-auto relative flex flex-col lg:flex-row space-between ">
            <div className="flex-1 order-2 lg:order-1 mt-8 lg:mt-0 text-center lg:text-left">
              <h4 className={"text-[2.375rem] lg:text-[3.75rem] leading-tight font-light mb-4 mt-0 md:mt-0 lg:mt-0 2xl:mt-20"}>Das Exxeta iBKM Dashboard</h4>
              <p className={"text-xl lg:text-2xl font-medium leading-relaxed mt-8"}>
                Für intelligentes Bilanzkreismanagement mit Hilfe von visualisierten, durch Machine Learning erzeugten Bilanzkreisprognosen.
              </p>
              <div className={"mt-6"}>
                <Button className="mr-4 mt-6" variant={"primary"} onClick={() => history.push('register')}>Jetzt loslegen!</Button>
              </div>
            </div>
            <div className={"w-full lg:w-2/3 flex order-1 lg:order-2 flex items-center justify-center"}>
              <img src="/dashboard-screen.png" className={"object-contain block max-h-screen"}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landingpage;
