import { GraphData } from '../components/graph/Graph';
import aiData from '../data/aiData.json';

export interface mockGraphData {
  berlin_time: string;
  'BK-Verbrauch': number,
  'Sonnenenergie': number,
  'Synthetische Daten': number,
  'Tageszeit': number,
  'Wochentag': number,
  'Vor und Nachgelagerte Netze': number,
  'Windenergie': number,
  prediction: number;
  ground_truth?: number;
}

export function explainableAIData(): GraphData[] {
  return (aiData as mockGraphData[]).sort((a, b) => {
    const firstDate = new Date(a.berlin_time);
    const secondDate = new Date(b.berlin_time);
    if (firstDate < secondDate) {
      return -1;
    } else if (firstDate > secondDate) {
      return 1;
    }
    return 0;
  }).map(graphData => ({
    ...graphData,
    time: graphData.berlin_time,
    prediction: graphData.prediction.toString(),
    ground_truth: graphData.ground_truth?.toString()
  }));
}
