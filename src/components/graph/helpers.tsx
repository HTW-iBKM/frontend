import { GraphData } from "./Graph";
import { getFormattedDate } from '../../utils/utility';

export function parseGraphData(data: GraphData[]): GraphData[] {
    return data.map((entry: GraphData) => {
        const prediction = Math.round(parseInt(entry.prediction));
        const ground_truth = Math.round(parseInt(entry.ground_truth || "0"));
        return {
            ...entry,
            prediction: prediction.toString(),
            ground_truth: ground_truth.toString(),
        };
    })
    .filter((entry, index) => index % Math.round(data.length / 50) === 0);
}

export function calculateTickCount(minValue: number, maxValue: number, yInterval: number): number {
    return maxValue && minValue != null
        ? (maxValue - minValue) / yInterval + 1
        : 5;
}

export function calculateDomain(data: GraphData[], minValue: number, maxValue: number, yInterval: number): [number, number] {
    let currentMax = 0;
    let currentMin = Infinity;
    data.forEach((element: GraphData) => {
        currentMax =
            Math.ceil(
                Math.max(Number(element.prediction), Number(element.ground_truth)) /
                yInterval
            ) * yInterval;
        currentMin =
            Math.floor(
                Math.min(Number(element.prediction), Number(element.ground_truth)) /
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
