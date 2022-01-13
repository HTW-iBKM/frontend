import React, { ReactElement } from 'react';
import './Graph.css';
import {
  CartesianGrid,
  Label,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area, AreaChart
} from "recharts";
import { parseGraphData, calculateTickCount, calculateDomain } from "./helpers";
import { GraphData, KeyData } from "./Graph";
import AIToolTipp from '../aiToolTipp/AIToolTipp';

interface AreaChartPanelProps {
  data: GraphData[];
  keyData: KeyData[]
  graphLineColors: string[];
}

function AreaChartPanel({ data, keyData, graphLineColors }: AreaChartPanelProps): ReactElement {
  const yIntervall = 500;
  const maxValue = 0;
  const minValue = Infinity;

  return (
    <div className={"w-full h-full"}>
      <ResponsiveContainer>
        <AreaChart data={parseGraphData(data)}
          margin={{ top: 50, right: 50, left: 36 }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <Tooltip
            content={<AIToolTipp payload={undefined} graphColors={graphLineColors}></AIToolTipp>}
            cursor={{ stroke: "#494B51", strokeWidth: 1 }}
            contentStyle={{ borderRadius: 8, padding: 16 }}
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            minTickGap={50}
            interval="preserveStartEnd"
            tick={{ fontSize: 12, color: "#494B51" }}
            tickMargin={10}
            tickSize={8}
            tickCount={calculateTickCount(minValue, maxValue, yIntervall)}
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
            domain={calculateDomain(data, minValue, maxValue, yIntervall)}
            allowDecimals={false}
            minTickGap={50}
            interval="preserveStartEnd"
            tickMargin={10}
            tickSize={8}
            tickCount={calculateTickCount(minValue, maxValue, yIntervall)}
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
              fill="url(#colorUv)"
              fillOpacity={1}
              unit=" KW"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaChartPanel;
