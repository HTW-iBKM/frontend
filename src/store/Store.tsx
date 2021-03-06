import create from 'zustand'
import { persist } from 'zustand/middleware'
import { GraphKey } from '../components/graph/Graph'

export const useStore = create(persist((set) => ({
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
    graphSettings: {
        keyData: [
            { key: GraphKey.PREDICTION, name: 'Prognose', checked: true },
            { key: GraphKey.GROUND_TRUTH, name: 'Tatsächlicher Verbrauch', checked: true }
        ],
        interval: "minutes",
        selectedTimespan: "day",
        activeGraph: "line_chart"

    },
    setGraphSettings: (graphSettings: any) => {
        set((state: any) => ({ graphSettings: { ...state.graphSettings, ...graphSettings } }))
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
        // getStorage: () => sessionStorage,
    })
)