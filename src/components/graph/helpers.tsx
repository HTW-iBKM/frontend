import { getFormattedDate } from '../../utils/utility';
import { GraphData, GraphKey, KeyData } from "./Graph";

export function parseGraphData(data: GraphData[], keyData: KeyData[]): GraphData[] {
    const dataWithKeys = data.map((entry: GraphData) => {
        let parsedData = {};
        // Get the keys which are available in the data
        const availableKeys: GraphKey[] = keyData.map(key => key.key);

        // Filter entry data by available keys + parse the entry data
        const entryKeyValuePair = Object.entries(entry);
        const filteredParsed = entryKeyValuePair.map(([key, value]) => {
            if (availableKeys.includes(key as GraphKey)) {
                return { [key]: Math.round(parseInt(value || "0")) }
            }
        }).filter(value => value);
        filteredParsed.map(el => parsedData = { ...el, ...parsedData })

        return {
            ...entry,
            ...parsedData,
        };
    })
    return data.length > 50 ? dataWithKeys.filter((entry, index) => index % Math.round(data.length / 50) === 0) : dataWithKeys;
}

export function calculateTickCount(minValue: number, maxValue: number, yInterval: number): number {
    return maxValue && minValue != null
        ? (maxValue - minValue) / yInterval + 1
        : 5;
}

export function calculateDomain(data: GraphData[], keyData: KeyData[], minValue: number, maxValue: number, yInterval: number): [number, number] {
    let currentMax = 0;
    let currentMin = Infinity;

    data.forEach((element: GraphData) => {
        const availableKeys: GraphKey[] = keyData.map(key => key.key);
        const filteredElements: number[] = Object.entries(element).map(([key, value]) => availableKeys.includes(key as GraphKey) ? value : null).filter(value => value);

        currentMax =
            Math.ceil(
                Math.max(...filteredElements) /
                yInterval
            ) * yInterval;
        currentMin =
            Math.floor(
                Math.min(...filteredElements) /
                yInterval
            ) * yInterval;
        if (currentMax > maxValue) maxValue = currentMax;
        if (currentMin < minValue) minValue = currentMin;
    });
    return [minValue, maxValue];
}

export const formatXAxisLabel = (value: string, showTime: boolean): string => {
    const time = new Date(value);
    if (showTime) {
        return time.toLocaleTimeString().slice(0, -3);
    } else {
        return getFormattedDate(time);
    }
}

export const formatDate = (date: Date): string => {
    return `${`0${date.getDate()}`.slice(-2) + '.' + `0${date.getMonth()}`.slice(-2) + '.' + date.getFullYear()}`;
}