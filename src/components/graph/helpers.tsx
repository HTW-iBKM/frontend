import {GraphData} from "./Graph";

export function parseGraphData(data: GraphData[]) {
    return data.map((entry: GraphData) => {
            const newTime = new Date(entry.time);
            const hours = newTime.toLocaleTimeString().slice(0, 5);
            const prediction = Math.round(parseInt(entry.prediction));
            const ground_truth = Math.round(parseInt(entry.ground_truth));
            return {
                ...entry,
                time: hours,
                prediction: prediction,
                ground_truth: ground_truth,
            };
        })
        .slice(0, 50)
}

export function calculateTickCount(minValue: number, maxValue: number, yIntervall: number) {
    return maxValue && minValue != null
        ? (maxValue - minValue) / yIntervall + 1
        : 5;
}

export function calculateDomain(data: GraphData[], minValue: number, maxValue: number, yIntervall: number) {
    let currentMax = 0;
    let currentMin = Infinity;
    data.forEach((element: GraphData) => {
        currentMax =
            Math.ceil(
                Math.max(Number(element.prediction), Number(element.ground_truth)) /
                yIntervall
            ) * yIntervall;
        currentMin =
            Math.floor(
                Math.min(Number(element.prediction), Number(element.ground_truth)) /
                yIntervall
            ) * yIntervall;
        if (currentMax > maxValue) maxValue = currentMax;
        if (currentMin < minValue) minValue = currentMin;
    });
    return [minValue, maxValue];
}