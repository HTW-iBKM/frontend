import React, {ReactElement, useEffect, useState} from 'react';
import {
    CartesianGrid,
    Line,
    Label,
    LineChart,
    BarChart,
    AreaChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip, Bar, Area
} from 'recharts';
import axios from 'axios';
import useAsyncEffect from "use-async-effect";
import './Graph.css';
import OpenInNewTabIcon from '../../components/icons/OpenInNewTabIcon';
// =======
// import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
// import axios from 'axios';
// import useAsyncEffect from "use-async-effect";
// import './Graph.css';
// >>>>>>> 13acd39a42838ae738455f034e8af3d50b7fb0ea
import Menu from './Menu';
import Tabs from "../tabs/Tabs";
import {calculateDomain, calculateTickCount, parseGraphData} from "./helpers";
import LineChartPanel from "./LineChart";

export interface GraphData {
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
    const GraphLineColors = ["#4074B2", "#DE9D28", "#edabd1", "#92dbd0"];
    const yIntervall = 500;
    const maxValue = 0;
    const minValue = Infinity;
    const styles = {
        graphContainer:
            "w-[calc(100%-3.5rem)] h-[calc(100%-3.5rem)] m-7 flex justify-center items-center flex-col ",
    };
    const url = window.location.href.split('/')[4];
    const showNewTabButton = url !== 'graph-details';

    const [data, setData] = useState<GraphData[]>([]);
    const [graphType, setGraphType] = useState("");

    useEffect(() => {
        console.log(graphType);
    }, [graphType])


    useAsyncEffect(async (isMounted) => {
        const {data}: GraphDataResponse = await axios.get(
            "https://6ys8ajad27.execute-api.us-east-1.amazonaws.com/"
        );
        if (!isMounted) return;
        setData(data.data.september_18);
    }, []);


    const chartB = () => {
        return <BarChart data={parseGraphData(data)}
                margin={{top: 50, right: 50, left: 36}}
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
                <Bar
                    name="Prognose"
                    dataKey={"prediction"}
                    fill={GraphLineColors[0]}
                    unit=" KW"
                />
                <Bar
                    name="Tatsächlicher Verbrauch"
                    dataKey={"ground_truth"}
                    fill={GraphLineColors[1]}
                    unit=" KW"
                />
            </BarChart>
    }

    const chartC = () => {
        return <AreaChart data={parseGraphData(data)}
                         margin={{top: 50, right: 50, left: 36}}
        >
            <CartesianGrid strokeDasharray="5 5"/>
            <Tooltip
                cursor={{stroke: "#494B51", strokeWidth: 1}}
                contentStyle={{borderRadius: 8, padding: 16}}
            />
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
            </defs>
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
            <Area
                type="monotone"
                name="Prognose"
                dataKey={"prediction"}
                stroke={GraphLineColors[0]}
                fill="url(#colorUv)"
                fillOpacity={1}
                unit=" KW"
            />
            <Area
                type="monotone"
                name="Tatsächlicher Verbrauch"
                dataKey={"ground_truth"}
                stroke={GraphLineColors[1]}
                fill="url(#colorUv)"
                fillOpacity={1}
                unit=" KW"
            />
        </AreaChart>
    }

    function renderChart(graphType: any) {
        switch (graphType) {
            case "linechart":
                return;
            case "chartB":
                return chartB();
            case "chartC":
                return chartC();
            default:
                return;
        }
    }


    return !data.length ? (
        <>Waiting for data...</>
    ) : (
        <div className={styles.graphContainer}>
            <div className="w-full flex justify-between">
                <h5>Bilanzkreis A Graph</h5> {/* TODO add real title */}
                {showNewTabButton &&
                <a href="#/graph-details" title="Open in new tab">
                    <OpenInNewTabIcon className="w-4 h-4 text-[#494B51]"/>
                </a>
                }
            </div>
            <Tabs className="w-full h-20" type="default" tabs={["Tab 1", "Tab 2", "Tab 3"]} panels={[<><LineChartPanel data={data} graphLineColors={GraphLineColors} /></> , <>Test2</>, <>Test3</>]} />

        </div>
    );
}

export default Graph;
