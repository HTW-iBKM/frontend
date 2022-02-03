import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(persist((set, get) => ({
    bilanzKreise: [],
    setBilanzKreise: (bilanzKreise: string[]) => set(() => ({ bilanzKreise })),
    selectedBilanzKreis: '',
    setSelectedBilanzKreis: (selectedBilanzKreis: string) => {
        return set(() => ({ selectedBilanzKreis }))
    },
    selectionModalOpen: false,
    setSelectionModalOpen: (selectionModalOpen: boolean) => {
        return set(() => ({ selectionModalOpen }))
    },
    legendProperties: {
        show: false,
    },
    setLegendProperties: (legendProperties: any) => set(() => ({ legendProperties }))
}),
    {
        name: "user-storage",
        getStorage: () => sessionStorage,
    })
)