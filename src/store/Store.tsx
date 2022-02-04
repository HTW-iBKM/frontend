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
    setLegendProperties: (legendProperties: any) => set((state: any) => ({ legendProperties: { ...state.legendProperties, ...legendProperties } })),
    dateTitle: {
        timespan: "",
        interval: "",
        value: "",
    },
    setDateTitle: (dateTitle: { interval: string, timespan: string, value: string }) => set((state: any) => ({ dateTitle: { ...state.dateTitle, ...dateTitle } }))
}),
    {
        name: "user-storage",
        getStorage: () => sessionStorage,
    })
)