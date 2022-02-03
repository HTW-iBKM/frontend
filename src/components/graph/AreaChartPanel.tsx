import React, { ReactElement, Ref } from 'react';
import './Graph.css';
import {
  CartesianGrid,
  Label,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area, AreaChart, Legend
} from "recharts";
import { parseGraphData, calculateDomain, formatXAxisLabel } from './helpers';
import { GraphData, KeyData } from "./Graph";
import AIToolTipp from '../aiToolTipp/AIToolTipp';
import { useStore } from '../../store/Store';


interface AreaChartPanelProps {
  data: GraphData[];
  keyData: KeyData[]
  graphLineColors: string[];
  interval: string
}

{/* @TODO Correct Ref Typing */ }
function AreaChartPanel({ data, keyData, graphLineColors, interval }: AreaChartPanelProps, ref: Ref<any>): ReactElement {
  const parsedData = parseGraphData(data, keyData);
  const xInterval = Math.round(parsedData.length / 8);
  const legendProperties = useStore((state) => state.legendProperties);
  return (
    <div className={"w-full h-full flex justify-center items-center"}>
      {!parsedData.length ? <div className="text-h6">Keine verfügbaren Daten für den gewählten Zeitraum.</div> :
        <ResponsiveContainer>
          <AreaChart data={parsedData}
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
            <defs>
              {keyData.map((data, index) =>
                data.checked &&
                <linearGradient key={index} id={data.key} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={graphLineColors[index]} stopOpacity={0.6} />
                  <stop offset="95%" stopColor={graphLineColors[index]} stopOpacity={0} />
                </linearGradient>
              )}
            </defs>
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
              <Area
                key={index}
                type="monotone"
                name={data.name}
                dataKey={data.key}
                stroke={graphLineColors[index]}
                fill={`url(#${data.key})`}
                fillOpacity={1}
                unit=" KW"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>}
    </div>
  );
}

export default React.forwardRef(AreaChartPanel);
