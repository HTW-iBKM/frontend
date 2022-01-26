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
    });
    const maxDataSize = 4 * 365;
    return data.length > maxDataSize ? dataWithKeys.filter((entry, index) => index % Math.round(data.length / maxDataSize) === 0) : dataWithKeys;
}

export function calculateDomain(data: GraphData[], keyData: KeyData[]): [number, number] {
    let maxValue = 0;
    let minValue = Infinity;
    const yInterval = 500;

    data.forEach((element: GraphData) => {
        const availableKeys: GraphKey[] = keyData.map(key => key.key);
        const filteredElements: number[] = Object.entries(element).map(([key, value]) => availableKeys.includes(key as GraphKey) ? value : null).filter(value => value);

        const currentMax =
            Math.ceil(
                Math.max(...filteredElements) /
                yInterval
            ) * yInterval;
        const currentMin =
            Math.floor(
                Math.min(...filteredElements) /
                yInterval
            ) * yInterval;
        if (currentMax > maxValue) maxValue = currentMax;
        if (currentMin < minValue) minValue = currentMin;
    });
    return [minValue, maxValue];
}

export const aggregateGraphData = (graphData: GraphData[], interval: string): GraphData[] => {
    switch (interval) {
        case 'minutes': return graphData;
        case 'hour': return aggregateByHour(graphData);
        case 'day': return aggregateByDay(graphData);
        case 'week': return aggregateByWeek(graphData);
        case 'month': return aggregateByMonth(graphData);
        default: return graphData;
    }
}

const aggregateByHour = (graphData: GraphData[]): GraphData[] => {
    const aggregatedGraphData: GraphData[] = [];
    let aggregatedElement: GraphData;
    let aggregateCounter = 0;
    const maxAggregations = 4;
    graphData.forEach(data => {
        const time = new Date(data.time);
        if (aggregateCounter === 0 || time.getMinutes() === 0) {
            aggregatedElement = {...data};
            aggregateCounter = 1;
        } else {
            if (aggregatedElement) {
                aggregatedElement.prediction += data.prediction;
                aggregatedElement.ground_truth += data.ground_truth;
                aggregateCounter++;
            }
        }
        if (aggregateCounter === maxAggregations || time.getMinutes() === 45) {
            if (aggregatedElement) {
                aggregatedGraphData.push(aggregatedElement);
                aggregateCounter = 0;
            }
        }
    });
    return aggregatedGraphData;
}

const aggregateByDay = (graphData: GraphData[]): GraphData[] => {
    const aggregatedGraphData: GraphData[] = [];
    let aggregatedElement: GraphData;
    let aggregateCounter = 0;
    const maxAggregations = 4 * 24;
    graphData.forEach(data => {
        const time = new Date(data.time);
        if (aggregateCounter === 0 || time.getHours() === 0 && time.getMinutes() === 0) {
            aggregatedElement = {...data};
            aggregateCounter = 1;
        } else {
            if (aggregatedElement) {
                aggregatedElement.prediction += data.prediction;
                aggregatedElement.ground_truth += data.ground_truth;
                aggregateCounter++;
            }
        }
        if (aggregateCounter === maxAggregations || time.getHours() === 23 && time.getMinutes() === 45) {
            if (aggregatedElement) {
                aggregatedGraphData.push(aggregatedElement);
                aggregateCounter = 0;
            }
        }
    });
    return aggregatedGraphData;
}
const aggregateByWeek = (graphData: GraphData[]): GraphData[] => {
    const aggregatedGraphData: GraphData[] = [];
    let aggregatedElement: GraphData;
    let aggregateCounter = 0;
    const maxAggregations = 4 * 24 * 7;
    graphData.forEach(data => {
        const time = new Date(data.time);
        if (aggregateCounter === 0 || time.getDay() === 1 && time.getHours() === 0 && time.getMinutes() === 0) {
            aggregatedElement = {...data};
            aggregateCounter = 1;
        } else {
            if (aggregatedElement) {
                aggregatedElement.prediction += data.prediction;
                aggregatedElement.ground_truth += data.ground_truth;
                aggregateCounter++;
            }
        }
        if (aggregateCounter === maxAggregations || time.getDay() === 0 && time.getHours() === 23 && time.getMinutes() === 45) {
            if (aggregatedElement) {
                aggregatedGraphData.push(aggregatedElement);
                aggregateCounter = 0;
            }
        }
    });
    return aggregatedGraphData;
}

const aggregateByMonth = (graphData: GraphData[]): GraphData[] => {
    const aggregatedGraphData: GraphData[] = [];
    let aggregatedElement: GraphData;
    graphData.forEach((data, index) => {
        const yesterday = new Date(graphData[index - 1]?.time);
        const today = new Date(data.time);
        if (!yesterday || yesterday.getMonth() !== today.getMonth()) {
            aggregatedElement = {...data};
        } else {
            if (aggregatedElement) {
                aggregatedElement.prediction += data.prediction;
                aggregatedElement.ground_truth += data.ground_truth;
            }
        }
        const tomorrow = new Date(graphData[index + 1]?.time);
        if (!tomorrow || tomorrow.getMonth() !== today.getMonth()) {
            if (aggregatedElement) {
                aggregatedGraphData.push(aggregatedElement);
            }
        }
    });
    return aggregatedGraphData;
}

export const formatXAxisLabel = (value: string, showTime: boolean): string => {
    const time = new Date(value);
    if (showTime) {
        return time.toLocaleTimeString().slice(0, -3);
    } else {
        return getFormattedDate(time);
    }
}

export const formatTooltipLabel = (value: string, showTime: boolean): string => {
    const time = new Date(value);
    if (showTime) {
        return time.toLocaleTimeString().slice(0, -3);
    } else {
        return getFormattedDate(time) + ' ' + time.toLocaleTimeString().slice(0, -3);
    }
}

export const formatDate = (date: Date): string => {
    return `${`0${date.getDate()}`.slice(-2) + '.' + `0${date.getMonth() + 1}`.slice(-2) + '.' + date.getFullYear()}`;
}
