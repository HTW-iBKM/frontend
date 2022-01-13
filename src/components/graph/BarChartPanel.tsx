import React, { ReactElement } from 'react';
import './Graph.css';
import {
  CartesianGrid,
  Label,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Bar,
  BarChart
} from "recharts";
import { parseGraphData, calculateTickCount, calculateDomain } from "./helpers";
import { GraphData, KeyData } from "./Graph";
import AIToolTipp from '../aiToolTipp/AIToolTipp';

interface BarChartPanelProps {
  data: GraphData[];
  keyData: KeyData[]
  graphLineColors: string[];
}

function BarChartPanel({ data, keyData, graphLineColors }: BarChartPanelProps): ReactElement {
  const yInterval = 500;
  const maxValue = 0;
  const minValue = Infinity;

  return (
    <div className={"w-full h-full"}>
      <ResponsiveContainer>
        <BarChart data={parseGraphData(data)}
          margin={{ top: 50, right: 50, left: 36 }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <Tooltip
            content={<AIToolTipp payload={undefined} graphColors={graphLineColors}></AIToolTipp>}
            cursor={{ stroke: "#494B51", strokeWidth: 1 }}
            contentStyle={{ borderRadius: 8, padding: 16 }}
          />
          <XAxis
            dataKey="time"
            minTickGap={50}
            interval="preserveStartEnd"
            tick={{ fontSize: 12, color: "#494B51" }}
            tickMargin={10}
            tickSize={8}
            tickCount={calculateTickCount(minValue, maxValue, yInterval)}
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
            domain={calculateDomain(data, minValue, maxValue, yInterval)}
            allowDecimals={false}
            minTickGap={50}
            interval="preserveStartEnd"
            tickMargin={10}
            tickSize={8}
            tickCount={calculateTickCount(minValue, maxValue, yInterval)}
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
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartPanel;
