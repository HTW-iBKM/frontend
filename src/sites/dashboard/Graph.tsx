import React, { ReactElement, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import axios from 'axios';
import useAsyncEffect from "use-async-effect";

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
  const [data, setData] = useState<GraphData[]>([]);

  useAsyncEffect(async isMounted => {
    const { data }: GraphDataResponse = await axios.get('https://6ys8ajad27.execute-api.us-east-1.amazonaws.com/')
    if(!isMounted) return;
    setData(data.data.september_18);
  }, []);

  return (!data.length ? <>Waiting for data...</> :
    <div className={'w-full h-full box-border bg-white p-1.5 flex justify-center items-center'}>
      <ResponsiveContainer width="95%" height="95%">
        <LineChart data={data.map((entry) => {
          const newTime = new Date(entry.time);
          const hours = newTime.toLocaleTimeString().slice(0, 5);
          return ({...entry, time: hours});
        })} margin={{top: 50, bottom: 50, left: 50, right: 100}}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="time" label={{value: 'Zeit', position: 'insideBottomRight', dy: -20, dx: 60}}/>
          <YAxis domain={[0, 2000]} label={{value: 'Verbrauch', position: 'insideLeft', dy: -340, dx: 20}}/>

          <Line
              name="Prognose"
              dataKey={'prediction'}
              stroke="blue"
              type="monotone"
              activeDot={{r: 0}}
          />
          <Line
              name="Tatsächlicher Verbrauch"
              dataKey={'ground_truth'}
              stroke="red"
              type="monotone"
              activeDot={{r: 0}}
          />
          <Legend verticalAlign="top"/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;
