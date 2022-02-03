import React, { ReactElement, Ref } from 'react';
import './Graph.css';
import {
  CartesianGrid,
  Label,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Bar,
  BarChart,
  Legend
} from "recharts";
import { parseGraphData, calculateDomain, formatXAxisLabel } from './helpers';
import { GraphData, KeyData } from "./Graph";
import AIToolTipp from '../aiToolTipp/AIToolTipp';
import { useStore } from '../../store/Store';

interface BarChartPanelProps {
  data: GraphData[];
  keyData: KeyData[]
  graphLineColors: string[];
  interval: string;
}

{/* @TODO Correct Ref Typing */ }
function BarChartPanel({ data, keyData, graphLineColors, interval }: BarChartPanelProps, ref: Ref<any>): ReactElement {
  const parsedData = parseGraphData(data, keyData);
  const xInterval = Math.round(parsedData.length / 8);
  const legendProperties = useStore((state) => state.legendProperties);
  return (
    <div className={"w-full h-full flex justify-center items-center"}>
      {!parsedData.length ? <div className="text-h6">Keine verfügbaren Daten für den gewählten Zeitraum.</div> :
        <ResponsiveContainer>
          <BarChart data={parsedData}
            margin={{ top: 50, right: 50, left: 36 }}
            ref={ref}
          >
            {legendProperties.show && <Legend verticalAlign='top' height={50} ></Legend>}
            <CartesianGrid strokeDasharray="5 5" />
            <Tooltip
              content={<AIToolTipp payload={undefined} graphColors={graphLineColors} keyData={keyData} interval={interval}></AIToolTipp>}
              cursor={{ stroke: "#494B51", strokeWidth: 1 }}
              contentStyle={{ borderRadius: 8, padding: 16 }}
            />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12, color: "#494B51" }}
              interval={xInterval}
              tickFormatter={(value: string) => formatXAxisLabel(value, interval)}
              axisLine={{ strokeWidth: 2, stroke: "#494B51" }}
              tickLine={{ strokeWidth: 2, stroke: "#494B51" }}
            >
              <Label
                className="axisLabel"
                value="Zeit"
                position="right"
                dx={16}
                dy={-14}
              />
            </XAxis>
            <YAxis
              type="number"
              domain={calculateDomain(parsedData, keyData)}
              axisLine={{ strokeWidth: 2, stroke: "#494B51" }}
              tick={{ fontSize: 12, color: "#494B51" }}
              tickLine={{ strokeWidth: 2, stroke: "#494B51" }}
            >
              <Label
                className="axisLabel"
                value="Verbrauch in KW"
                position="top"
                dy={-16}
              />
            </YAxis>
            {keyData.map((data, index) =>
              data.checked &&
              <Bar
                key={index}
                name={data.name}
                dataKey={data.key}
                fill={graphLineColors[index]}
                unit=" KW"
              />
            )}
          </BarChart>
        </ResponsiveContainer>}
    </div>
  );
}

export default React.forwardRef(BarChartPanel);
