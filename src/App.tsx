import React, {ReactElement} from 'react';
import {HashRouter} from 'react-router-dom';
import './App.css';
import PublicRoutes from './Routes';
import create from 'zustand'

export const useStore = create((set: any) => ({
    useBilanzKreise: [
        [],
        (bilanzkreise: string[]) => {
            return set((state: any) => ({useBilanzKreise: [bilanzkreise, state.useBilanzKreise[1]]}))
        },
    ],
    selectedBilanzKreis: [
        '',
        (selectedBilanzkreis: string) => {
            return set((state: any) => ({selectedBilanzKreis: [selectedBilanzkreis, state.selectedBilanzKreis[1]]}))
        }
    ],
    selectionModalOpen: [
        false,
        (isOpen: boolean) => {
            return set((state: any) => ({selectionModalOpen: [isOpen, state.selectionModalOpen[1]]}))
        }
    ]
}))

function App(): ReactElement {
    return (
        <HashRouter>
            <PublicRoutes></PublicRoutes>
            {/* <Landingpage></Landingpage> */}
        </HashRouter>
    );
}

export default App;