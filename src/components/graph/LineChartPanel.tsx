import React, {ReactElement} from 'react';
import './Graph.css';
import {LineChart, CartesianGrid, Label, Line, Tooltip, XAxis, YAxis, ResponsiveContainer} from "recharts";
import {parseGraphData, calculateTickCount, calculateDomain} from "./helpers";
import {GraphData} from "./Graph";

interface LineChartPanelProps {
    data: GraphData[];
    graphLineColors: string[];
}

function LineChartPanel({data, graphLineColors}: LineChartPanelProps): ReactElement {
    const yIntervall = 500;
    const maxValue = 0;
    const minValue = Infinity;

    return (
        <div className={"w-full h-full"}>
          <ResponsiveContainer>
            <LineChart
              data={parseGraphData(data)}
              margin={{top: 50, right: 50, left: 36}}
              className={"w-full h-full"}
            >
              <CartesianGrid strokeDasharray="5 5"/>
              <Tooltip
                cursor={{stroke: "#494B51", strokeWidth: 1}}
                contentStyle={{borderRadius: 8, padding: 16}}
              />
              <XAxis
                dataKey="time"
                minTickGap={50}
                interval="preserveStartEnd"
                tick={{fontSize: 12, color: "#494B51"}}
                tickMargin={10}
                tickSize={8}
                tickCount={calculateTickCount(minValue, maxValue, yIntervall)}
                axisLine={{strokeWidth: 2, stroke: "#494B51"}}
                tickLine={{strokeWidth: 2, stroke: "#494B51"}}
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
                axisLine={{strokeWidth: 2, stroke: "#494B51"}}
                tick={{fontSize: 12, color: "#494B51"}}
                tickLine={{strokeWidth: 2, stroke: "#494B51"}}
              >
                <Label
                  className="axisLabel"
                  value="Verbrauch in KW"
                  position="top"
                  dy={-16}
                />
              </YAxis>
              <Line
                name="Prognose"
                dataKey={"prediction"}
                stroke={graphLineColors[0]}
                dot={{fill: graphLineColors[0], r: 1}}
                activeDot={{
                  fill: "#FAFAFA",
                  stroke: graphLineColors[0],
                  strokeWidth: 1.5,
                  r: 3,
                }}
                unit=" KW"
                strokeWidth={1.5}
              />
              <Line
                name="Tatsächlicher Verbrauch"
                dataKey={"ground_truth"}
                stroke={graphLineColors[1]}
                dot={{fill: graphLineColors[1], r: 1}}
                activeDot={{
                  fill: "#FAFAFA",
                  stroke: graphLineColors[1],
                  strokeWidth: 1.5,
                  r: 3,
                }}
                unit=" KW"
                strokeWidth={1.5}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
    );
}

export default LineChartPanel;
