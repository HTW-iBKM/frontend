import React, {Fragment, ReactElement, useState} from 'react';
import Button from "../../components/form/Button";
import { Transition } from "@headlessui/react";
import {useHistory} from "react-router-dom";
import "./Landingpage.css";
import CloseIcon from "../../components/icons/CloseIcon";

function Landingpage(): ReactElement {
    const history = useHistory();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    return (
      <div className="overflow-hidden h-screen w-full relative ">
        <div className={"lp-background-clip pointer-events-none absolute w-full h-full -right-1/2 md:-right-1/3 lg:-right-1/4 bg-secondary-light bg-opacity-20"}></div>

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
          <div className={"absolute inset-0 bg-grayscale-light md:bg-transparent z-50 md:relative block md:hidden"}>
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

        <div className={"absolute inset-0 overflow-y-scroll"}>
          <div className={"w-full mb-6 md:mb-10"}>
            <div className="container px-8 lg:px-2 mx-auto flex items-center justify-between h-32">
              <h5 className="text-h5 flex flex-col md:flex-row items-start md:items-center">
                <img src="/exxetalogo.png" className={"h-12 mr-4"}></img>
                Exxeta iBKM
              </h5>

              <div className={"hidden md:block"}>
                <Button className="mr-6" variant={"text"} onClick={() => history.push('Einloggen')}>Über uns</Button>
                <Button className="mr-6" variant={"text"} onClick={() => history.push('Einloggen')}>Kontakt</Button>
                <Button variant={"secondary"} onClick={() => history.push('login')}>Einloggen</Button>
              </div>

              <Button variant={"text"} className={"inline-block md:hidden"} onClick={() => setIsMenuOpen(true)}>Menü</Button>
            </div>
          </div>
          <div className={"w-full"}>
            <div className="container px-8 lg:px-2 mx-auto relative flex flex-col lg:flex-row space-between ">
              <div className="flex-1 order-2 lg:order-1 mt-8 lg:mt-0">
                <h4 className={"text-[2.375rem] lg:text-[3.75rem] leading-tight font-light mb-4 mt-0 md:mt-0 lg:mt-0 2xl:mt-20"}>Das Exxeta IBKM Dashboard</h4>
                <p className={"text-xl lg:text-2xl font-medium leading-relaxed mt-8"}>
                  Für intelligentes Bilanzkreismanagement mit Hilfe von visualisierten, durch Machine Learning erzeugten Bilanzkreisprognosen.
                </p>
                <div className={"mt-6"}>
                  <Button className="mr-4 mt-6" variant={"primary"} onClick={() => history.push('register')}>Jetzt loslegen!</Button>
                </div>
              </div>
              <div className={"w-full lg:w-2/3 flex order-1 lg:order-2 flex items-center justify-center"}>
                <img src="/dashboard-screen.png" className={"object-contain block"}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Landingpage;
