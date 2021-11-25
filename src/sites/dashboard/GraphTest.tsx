import React, {ReactElement} from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import data from '../../static/september_18.json';
import './dashboard.css';

function GraphTest(): ReactElement {
    return (<div className={"w-full h-full box-border bg-white p-1.5 flex justify-center items-center"}>
        <ResponsiveContainer width="95%" height="95%">
            <LineChart data={data.map((entry) => {
                const newTime = new Date(entry.time);
                const hours = newTime.toLocaleTimeString().slice(0, 5)
                return ({ ...entry, time: hours })
            })
            }
                margin={{ top: 100, bottom: 100, left: 100, right: 100 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" label={{ value: "Zeit", position: "insideBottomRight", dy: -20, dx: 60 }} />
                <YAxis label={{ value: "Verbrauch", position: "insideLeft", dy: -360, dx: 20 }} />

                <Line
                    name="Prognose"
                    dataKey={'prediction'}
                    stroke='blue'
                    type="monotone"
                    activeDot={{ r: 0 }}
                />
                <Line
                    name="Tatsächlicher Verbrauch"
                    dataKey={'ground_truth'}
                    stroke='red'
                    type="monotone"
                    activeDot={{ r: 0 }}
                />
                <Legend verticalAlign="top" />
            </LineChart>
        </ResponsiveContainer>
    </div>
    )
}

export default GraphTest;
