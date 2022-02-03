import React, { ReactElement, useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css';
import PublicRoutes from './Routes';
import { useStore } from './store/Store';





function App(): ReactElement {
    // when store is taken from session storage!
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => { useStore.persist.rehydrate().then(() => setHydrated(true)) },)

    return (<>
        {
            hydrated && <HashRouter>
                <PublicRoutes></PublicRoutes>
                {/* <Landingpage></Landingpage> */}
            </HashRouter>
        }
    </>);
}

export default App;