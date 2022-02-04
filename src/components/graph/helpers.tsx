import { getFormattedDate, getFormattedTime } from '../../utils/utility';
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
    const yInterval = 1000;

    data.forEach((element: GraphData) => {
        const availableKeys: GraphKey[] = keyData.map(key => key.key);
        const filteredElements: number[] = Object.entries(element).map(([key, value]) => availableKeys.includes(key as GraphKey) ? value : null).filter(value => value);

        const currentMax =
            Math.ceil(
                Math.max(...filteredElements) /
                yInterval
            ) * yInterval;
        if (currentMax > maxValue) maxValue = currentMax;
    });
    return [0, maxValue];
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
    graphData.forEach((data, index) => {
        const previousTime = new Date(graphData[index - 1]?.time);
        const time = new Date(data.time);
        if (!previousTime || previousTime.getHours() !== time.getHours()) {
            aggregatedElement = {...data, prediction: +data.prediction, ground_truth: +data.ground_truth};
        } else {
            if (aggregatedElement) {
                aggregatedElement.prediction += +data.prediction;
                aggregatedElement.ground_truth += +data.ground_truth;
            }
        }
        const nextTime = new Date(graphData[index + 1]?.time);
        if (!nextTime || nextTime.getHours() !== time.getHours()) {
            if (aggregatedElement) {
                aggregatedGraphData.push(aggregatedElement);
            }
        }
    });
    return aggregatedGraphData;
}

const aggregateByDay = (graphData: GraphData[]): GraphData[] => {
    const aggregatedGraphData: GraphData[] = [];
    let aggregatedElement: GraphData;
    graphData.forEach((data, index) => {
        const previousTime = new Date(graphData[index - 1]?.time);
        const time = new Date(data.time);
        if (!previousTime || previousTime.getDate() !== time.getDate()) {
            aggregatedElement = {...data, prediction: +data.prediction, ground_truth: +data.ground_truth};
        } else {
            if (aggregatedElement) {
                aggregatedElement.prediction += +data.prediction;
                aggregatedElement.ground_truth += +data.ground_truth;
            }
        }
        const nextTime = new Date(graphData[index + 1]?.time);
        if (!nextTime || nextTime.getDate() !== time.getDate()) {
            if (aggregatedElement) {
                aggregatedGraphData.push(aggregatedElement);
            }
        }
    });
    return aggregatedGraphData;
}
const aggregateByWeek = (graphData: GraphData[]): GraphData[] => {
    const aggregatedGraphData: GraphData[] = [];
    let aggregatedElement: GraphData;
    graphData.forEach((data, index) => {
        const previousTime = new Date(graphData[index - 1]?.time);
        const time = new Date(data.time);
        if (!previousTime || weekNumber(previousTime) !== weekNumber(time)) {
            aggregatedElement = {...data, prediction: +data.prediction, ground_truth: +data.ground_truth};
        } else {
            if (aggregatedElement) {
                aggregatedElement.prediction += +data.prediction;
                aggregatedElement.ground_truth += +data.ground_truth;
            }
        }
        const nextTime = new Date(graphData[index + 1]?.time);
        if (!nextTime || weekNumber(nextTime) !== weekNumber(time)) {
            if (aggregatedElement) {
                aggregatedGraphData.push(aggregatedElement);
            }
        }
    });
    return aggregatedGraphData;
}

const aggregateByMonth = (graphData: GraphData[]): GraphData[] => {
    const aggregatedGraphData: GraphData[] = [];
    let aggregatedElement: GraphData;
    graphData.forEach((data, index) => {
        const previousTime = new Date(graphData[index - 1]?.time);
        const time = new Date(data.time);
        if (!previousTime || previousTime.getMonth() !== time.getMonth()) {
            aggregatedElement = {...data, prediction: +data.prediction, ground_truth: +data.ground_truth};
        } else {
            if (aggregatedElement) {
                aggregatedElement.prediction += +data.prediction;
                aggregatedElement.ground_truth += +data.ground_truth;
            }
        }
        const nextTime = new Date(graphData[index + 1]?.time);
        if (!nextTime || nextTime.getMonth() !== time.getMonth()) {
            if (aggregatedElement) {
                aggregatedGraphData.push(aggregatedElement);
            }
        }
    });
    return aggregatedGraphData;
}

const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
];

export const formatXAxisLabel = (value: string, interval: string): string => {
    const date = new Date(value);
    switch (interval) {
        case 'minutes': return getFormattedTime(date);
        case 'hour': return getFormattedTime(date);
        case 'day': return getFormattedDate(date);
        case 'week': return 'KW' + weekNumber(date);
        case 'month': return monthNames[date.getMonth()];
        default: return getFormattedDate(date);
    }
}

const weekNumber = (date: Date): number => {
    const firstOfJanuary = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date.getTime() - firstOfJanuary.getTime()) / 86400000) + firstOfJanuary.getDay() + 1) / 7);
}

export const formatTooltipLabel = (value: string, interval: string): string => {
    const date = new Date(value);
    const date2 = new Date(value);
    switch (interval) {
        case 'minutes': return getFormattedDate(date) + ' ' + getFormattedTime(date);
        case 'hour': return getFormattedDate(date) + ' ' + getFormattedTime(date);
        case 'day': return getFormattedDate(date);
        case 'week': date2.setDate(date2.getDate() + 7); return getFormattedDate(date) + ' - ' + getFormattedDate(date2);
        case 'month': return getFormattedDate(new Date(date.getFullYear(), date.getMonth(), 1)) + ' - ' + getFormattedDate(lastDayOfMonth(date));
        default: return getFormattedDate(date);
    }
}

const lastDayOfMonth = (date: Date): Date => new Date(date.getFullYear(), date.getMonth() + 1, 0);


export const formatDate = (date: Date): string => {
    return `${`0${date.getDate()}`.slice(-2) + '.' + `0${date.getMonth() + 1}`.slice(-2) + '.' + date.getFullYear()}`;
}
