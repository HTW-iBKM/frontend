import React, { ReactElement, Ref, } from 'react';
import './Graph.css';
import {
  LineChart,
  CartesianGrid,
  Label,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { parseGraphData, calculateDomain, formatXAxisLabel } from './helpers';
import { GraphData, KeyData } from "./Graph";
import AIToolTipp from '../aiToolTipp/AIToolTipp';

export interface LineChartPanelProps {
  data: GraphData[];
  keyData: KeyData[];
  graphLineColors: string[];
  interval: string;
}

{/* @TODO Correct Ref Typing */ }
function LineChartPanel({ data, keyData, graphLineColors, interval }: LineChartPanelProps, ref: Ref<any>): ReactElement {
  const parsedData = parseGraphData(data, keyData);
  const xInterval = Math.round(parsedData.length / 8);

  return (
    <div className={"w-full h-full"}>
      <ResponsiveContainer>
        <LineChart
          data={parsedData}
          margin={{ top: 50, right: 50, left: 36 }}
          className={"w-full h-full"}
          ref={ref}
        >
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
            <Line
              key={index}
              name={data.name}
              dataKey={data.key}
              stroke={graphLineColors[index]}
              dot={{ fill: graphLineColors[index], r: 0 }}
              activeDot={{
                fill: "#FAFAFA",
                stroke: graphLineColors[index],
                strokeWidth: 1.5,
                r: 3,
              }}
              unit=" KW"
              strokeWidth={1.5}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default React.forwardRef(LineChartPanel);
