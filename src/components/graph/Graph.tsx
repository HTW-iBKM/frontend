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

  function calculateDomainMax(data: GraphData[]) {
    let maxValue = 0;
    let currentMax = 0;
    data.forEach(element => {
      currentMax = Math.ceil(Math.max(Number(element.prediction), Number(element.ground_truth)) / 1000) * 1000;
      if (currentMax > maxValue) maxValue = currentMax;
    });
    return maxValue;
  }

  return !data.length ? (
    <>Waiting for data...</>
  ) : (
    <div className={styles.graphContainer}>
      <ResponsiveContainer>
        <LineChart
          data={data.map((entry) => {
            const newTime = new Date(entry.time);
            const hours = newTime.toLocaleTimeString().slice(0, 5);
            return { ...entry, time: hours };
          })}
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
            axisLine={{ strokeWidth: 2, stroke: "#494B51" }}
            tickLine={{ strokeWidth: 2, stroke: "#494B51" }}
          >
            <Label className="axisLabel" value="Zeit" position="right" dx={16} dy={-14} />
          </XAxis>

          <YAxis
            type="number"
            domain={[0, calculateDomainMax(data)]}
            allowDecimals={false}
            minTickGap={50}
            interval="preserveStartEnd"
            tickMargin={10}
            tickSize={8}
            axisLine={{ strokeWidth: 2, stroke: "#494B51" }}
            tick={{ fontSize: 12, color: "#494B51" }}
            tickLine={{ strokeWidth: 2, stroke: "#494B51" }}

          >
            <Label className="axisLabel" value="Verbrauch in KW" position="top" dy={-16} />
          </YAxis>
          <Line name="Prognose" dataKey={"prediction"} stroke="blue" />
          <Line
            name="Tatsächlicher Verbrauch"
            dataKey={"ground_truth"}
            stroke="red"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;
