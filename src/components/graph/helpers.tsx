import { GraphData } from "./Graph";

export function parseGraphData(data: GraphData[]): GraphData[] {
    return data.map((entry: GraphData) => {
        const newTime = new Date(entry.time);
        const hours = newTime.toLocaleTimeString().slice(0, 5);
        const prediction = Math.round(parseInt(entry.prediction));
        const ground_truth = Math.round(parseInt(entry.ground_truth || "0"));
        return {
            ...entry,
            time: hours.toString(),
            prediction: prediction.toString(),
            ground_truth: ground_truth.toString(),
        };
    })
        .slice(0, 50)
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