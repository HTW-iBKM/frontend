import React from 'react';
import { HashRouter } from 'react-router-dom';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import data from '../../static/september_18.json';
import './dashboard.css';

function Dashboard() {
    return (<div className="chartContainer">
        <ResponsiveContainer width="95%" height="95%" >
            <LineChart data={data} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                {data.map((item: any, index: any) => {
                    return <>
                        <Line
                            dataKey={'prediction'}
                            stroke='blue'
                            type="monotone"
                            activeDot={{ r: 0 }}
                        />
                        <Line
                            dataKey={'ground_truth'}
                            stroke='red'
                            type="monotone"
                            activeDot={{ r: 0 }}
                        />
                    </>
                })
                }
            </LineChart>
        </ResponsiveContainer>
    </div>
    )
}

export default Dashboard;
