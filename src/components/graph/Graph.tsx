import React, { ReactElement, useState } from "react";
import {
  CartesianGrid,
  Line,
  Label,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import axios from "axios";
import useAsyncEffect from "use-async-effect";
import "./Graph.css";

interface GraphData {
  time: string;
  daily_cos: string;
  weekly_sin: string;
  forecast_2: {
    "0_globalstrahlung": string;
    "0_temp": string;
    "0_pressure": string;
  };
  daily_sin: string;
  weekly_cos: string;
  intercept: string;
  prediction: string;
  ground_truth: string;
  sumFeature: number;
  day_hour: number;
  weekday: number;
  sun: number;
  pressure: number;
}

interface GraphDataResponse {
  data: {
    data: {
      [x: string]: GraphData[];
    };
  };
}

function Graph(): ReactElement {
  const yIntervall = 500;
  let maxValue = 0;
  let minValue = Infinity;
  const GraphLineColors = ["#4074B2", "#DE9D28", "#edabd1", "#92dbd0"];

  const styles = {
    graphContainer:
      "w-[calc(100%-3.5rem)] h-[calc(100%-3.5rem)] m-7 flex justify-center items-center ",
  };
  const [data, setData] = useState<GraphData[]>([]);

  useAsyncEffect(async (isMounted) => {
    const { data }: GraphDataResponse = await axios.get(
      "https://6ys8ajad27.execute-api.us-east-1.amazonaws.com/"
    );
    if (!isMounted) return;
    setData(data.data.september_18);
  }, []);

  function calculateDomain() {
    let currentMax = 0;
    let currentMin = Infinity;
    data.forEach((element) => {
      currentMax =
        Math.ceil(
          Math.max(Number(element.prediction), Number(element.ground_truth)) /
          yIntervall
        ) * yIntervall;
      currentMin = Math.floor(
        Math.min(Number(element.prediction), Number(element.ground_truth)) /
        yIntervall
      ) * yIntervall;
      if (currentMax > maxValue) maxValue = currentMax;
      if (currentMin < minValue) minValue = currentMin;
    });
    return [minValue, maxValue];
  }

  function calculateTickCount() {
    return maxValue != null && minValue != null ? ((maxValue - minValue) / yIntervall) + 1 : 5;
  }

  return !data.length ? (
    <>Waiting for data...</>
  ) :
    (
      <div className={styles.graphContainer}>
        <ResponsiveContainer>
          <LineChart
            data={data.map((entry) => {
              const newTime = new Date(entry.time);
              const hours = newTime.toLocaleTimeString().slice(0, 5);
              return { ...entry, time: hours };
            }).slice(0, 50)}
            margin={{ top: 50, right: 50, left: 36 }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis
              dataKey="time"
              minTickGap={50}
              interval="preserveStartEnd"
              tick={{ fontSize: 12, color: "#494B51" }}
              tickMargin={10}
              tickSize={8}
              tickCount={calculateTickCount()}
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
              domain={calculateDomain()}
              allowDecimals={false}
              minTickGap={50}
              interval="preserveStartEnd"
              tickMargin={10}
              tickSize={8}
              tickCount={calculateTickCount()}
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
            <Line
              name="Prognose"
              dataKey={"prediction"}
              stroke={GraphLineColors[0]}
              dot={{ fill: GraphLineColors[0], r: 1 }}
              unit="KW"
              strokeWidth={1.5}
            />
            <Line
              name="Tatsächlicher Verbrauch"
              dataKey={"ground_truth"}
              stroke={GraphLineColors[1]}
              dot={{ fill: GraphLineColors[1], r: 1 }}
              unit="KW"
              strokeWidth={1.5}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
}

export default Graph;
