import axios from 'axios';
import { GraphData } from '../components/graph/Graph';


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
  ground_truth: number;
}

export async function explainableAIData(): Promise<GraphData[]> {
  const { data }: { data: mockGraphData[] } = await axios.get(
    "https://bk4lqamoq9.execute-api.eu-west-1.amazonaws.com/"
  );
  
  return data.map(graphData => ({
    ...graphData,
    time: graphData.berlin_time
  }));
}
