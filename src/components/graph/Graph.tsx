import React, { ReactElement, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import axios from 'axios';
import useAsyncEffect from "use-async-effect";
import './Graph.css';

interface GraphData {
  time: string;
  daily_cos: string;
  weekly_sin: string;
  forecast_2: {
    '0_globalstrahlung': string;
    '0_temp': string;
    '0_pressure': string;
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
  pressure: number
}

interface GraphDataResponse {
  data: {
    data: {
      [x: string]: GraphData[]
    }
  }
}

function Graph(): ReactElement {
  const styles = {
    graphContainer: 'w-[calc(100%-2.5rem)] h-[calc(100%-2.5rem)] m-7 flex justify-center items-center '
  };
  const [data, setData] = useState<GraphData[]>([]);

  useAsyncEffect(async isMounted => {
    const { data }: GraphDataResponse = await axios.get('https://6ys8ajad27.execute-api.us-east-1.amazonaws.com/');
    if(!isMounted) return;
    setData(data.data.september_18);
  }, []);

  return (!data.length ? <>Waiting for data...</> :
    <div className={styles.graphContainer}>
      <ResponsiveContainer>
        <LineChart data={data.map((entry) => {
          const newTime = new Date(entry.time);
          const hours = newTime.toLocaleTimeString().slice(0, 5);
          return ({...entry, time: hours});
        })}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="time" label={{value: 'Zeit', position: 'insideBottomRight', dy: 10}}/>
          <YAxis domain={[0, 2000]} label={{value: 'Verbrauch', position: 'insideLeft', angle: -90, dy: -10}}/>

          <Line
              name="Prognose"
              dataKey={'prediction'}
              stroke="blue"
              type="monotone"
              dot={false}
          />
          <Line
              name="Tatsächlicher Verbrauch"
              dataKey={'ground_truth'}
              stroke="red"
              type="monotone"
              dot={false}
          />
          <Legend verticalAlign="top"/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;
