import React, { ReactElement, useContext, useState } from "react";
import {
  CartesianGrid,
  Line,
  Label,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import axios from "axios";
import useAsyncEffect from "use-async-effect";
import './Graph.css';
import OpenInNewTabIcon from '../../components/icons/OpenInNewTabIcon';
import Button from '../../components/form/button/Button';
import { v4 as uuidv4 } from 'uuid';
import SaveFileTemplate from "../modal/SaveFileModalTemplate";
import EditTimeSeriesTemplate from "../modal/EditTimeSeriesModalTemplate";
import { ModalContext } from "../../context/ModalContext";
import EditIcon from "../icons/EditIcon";
import InsertDriveFileIcon from "../icons/InsertDriveFileIcon";

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

enum GraphKey {
  PREDICTION = 'prediction',
  GROUND_TRUTH = 'ground_truth'
}

interface KeyData {
  key: GraphKey,
  name: string
}

const GraphData: KeyData[] = [
  {key: GraphKey.PREDICTION, name: 'Prognose'},
  {key: GraphKey.GROUND_TRUTH, name: 'Tatsächlicher Verbrauch'}
];

function Graph(): ReactElement {
  const yIntervall = 500;
  let maxValue = 0;
  let minValue = Infinity;
  const GraphLineColors = ["#4074B2", "#DE9D28", "#edabd1", "#92dbd0"];

  const styles = {
    graphContainer:
      "w-[calc(100%-3.5rem)] h-[calc(100%-3.5rem)] m-7 flex justify-center items-center flex-col "
  };
  const url = window.location.href.split('/')[4];
  const showNewTabButton = url !== 'graph-details';

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
      currentMin =
        Math.floor(
          Math.min(Number(element.prediction), Number(element.ground_truth)) /
          yIntervall
        ) * yIntervall;
      if (currentMax > maxValue) maxValue = currentMax;
      if (currentMin < minValue) minValue = currentMin;
    });
    return [minValue, maxValue];
  }

  function calculateTickCount() {
    return maxValue != null && minValue != null
      ? (maxValue - minValue) / yIntervall + 1
      : 5;
  }

  const modalContext = useContext(ModalContext);

  const showSaveModalModal = () => {
    modalContext.isOpen = true;
    modalContext.setIsOpen(true);
    modalContext.setModalContent({
      id: uuidv4(), 
      headline: "Als Datei speichern", 
      content: <SaveFileTemplate></SaveFileTemplate>
    });
  };

  const showEditModal = () => {
    modalContext.isOpen = true;
    modalContext.setIsOpen(true);
    modalContext.setModalContent({
      id: uuidv4(), 
      headline: "Zeitreihen bearbeiten", 
      content: <EditTimeSeriesTemplate></EditTimeSeriesTemplate>
    });
  };

  return !data.length ? (
    <div className={styles.graphContainer}>Waiting for data...</div>
  ) : (
    <div className={styles.graphContainer}>
      <div className="w-full flex justify-between">
        <h5 className="text-h5">Bilanzkreis A Graph</h5> {/* TODO add real title */}
        {showNewTabButton &&
          <Button variant={"icon"}
                  onClick={() => window.open('#/graph-details', '_blank')}
                  title="Open in new tab">
            <OpenInNewTabIcon className="w-4 h-4 text-[#494B51]"/>
          </Button>
        }
      </div>
      <ResponsiveContainer>
        <LineChart
          data={data
            .map((entry) => {
              const newTime = new Date(entry.time);
              const hours = newTime.toLocaleTimeString().slice(0, 5);
              const prediction = Math.round(parseInt(entry.prediction));
              const ground_truth = Math.round(parseInt(entry.ground_truth));
              return {
                ...entry,
                time: hours,
                prediction: prediction,
                ground_truth: ground_truth,
              };
            })
            .slice(0, 50)}
          margin={{ top: 50, right: 50, left: 36 }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <Tooltip
            cursor={{ stroke: "#494B51", strokeWidth: 1 }}
            contentStyle={{ borderRadius: 8, padding: 16 }}
          />
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
          {GraphData.map((data, index) =>
              <Line key={index}
                  name={data.name}
                  dataKey={data.key}
                  stroke={GraphLineColors[index]}
                  dot={{ fill: GraphLineColors[index], r: 1 }}
                  activeDot={{
                    fill: "#FAFAFA",
                    stroke: GraphLineColors[index],
                    strokeWidth: 1.5,
                    r: 3,
                  }}
                  unit=" KW"
                  strokeWidth={1.5}
              />
          )}
        </LineChart>
      </ResponsiveContainer>
      <div className="border border-[#E2E2E2] w-full m-5"/>
      <div className="w-full flex justify-center">
        {GraphData.map((data, index) =>
            <div key={index} className="min-w-max flex items-center gap-3 mx-5">
              <span className={`w-5 h-5 rounded-[2px]`} style={{backgroundColor: GraphLineColors[index]}}/>
              <span className="text-body1">{data.name}</span>
            </div>
        )}
        <div className="mx-5">
          <Button variant={"icon"} onClick={showEditModal}><EditIcon></EditIcon></Button>
          <Button variant={"icon"} onClick={showSaveModalModal}><InsertDriveFileIcon></InsertDriveFileIcon></Button>
        </div>
      </div>
    </div>
  );
}

export default Graph;
