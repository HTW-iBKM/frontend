import React, { ReactElement, useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import './dashboard.css';
import axios from 'axios';
import { GraphData } from '../../models/graph-data';

function Dashboard(): ReactElement {
  const [data, setData] = useState<GraphData[]>([]);

  useEffect(() => {
    axios.get('https://6ys8ajad27.execute-api.us-east-1.amazonaws.com/').then(
        (response: {data: {data: {september_18: GraphData[]}}}) => {
          console.log(response);
          setData(response.data.data.september_18);
        });
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

export default Dashboard;
