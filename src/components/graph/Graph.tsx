import React, {ReactElement, useContext, useState} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import useAsyncEffect from "use-async-effect";
import './Graph.css'
import OpenInNewTabIcon from '../../components/icons/OpenInNewTabIcon';
import Tabs from "../tabs/Tabs";
import LineChartPanel from "./LineChartPanel";
import BarChartPanel from "./BarChartPanel";
import AreaChartPanel from "./AreaChartPanel";
import TimelineIcon from "../icons/TimelineIcon";
import EqualizerIcon from "../icons/EqualizerIcon";
import StackedLineChartIcon from "../icons/StackedLineChartIcon";
import Button from "../form/Button";
import EditIcon from "../icons/EditIcon";
import InsertDriveFileIcon from "../icons/InsertDriveFileIcon";
import SaveFileTemplate from "../modal/SaveFileModalTemplate";
import EditTimeSeriesTemplate from "../modal/EditTimeSeriesModalTemplate";
import Modal from "../modal/Modal";

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
    const styles = {
        graphContainer:
          "w-[calc(100%-3.5rem)] h-[calc(100%-3.5rem)] m-7 flex justify-center items-center flex-col ",
    };
    const GraphLineColors = ["#4074B2", "#DE9D28", "#edabd1", "#92dbd0"];

    const url = window.location.href.split('/')[4];
    const showNewTabButton = url !== 'graph-details';

    const [data, setData] = useState<GraphData[]>([]);

    const IconTimeline = <><TimelineIcon className={"h-5 w-5"}/></>
    const IconEqualizer = <><EqualizerIcon className={"h-5 w-5"}/></>
    const IconStackedLineChart = <><StackedLineChartIcon className={"h-5 w-5"}/></>

    const LineChart = <LineChartPanel data={data} graphLineColors={GraphLineColors} />
    const BarChart = <><BarChartPanel data={data} graphLineColors={GraphLineColors} /></>
    const AreaChart = <><AreaChartPanel data={data} graphLineColors={GraphLineColors} /></>

    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
    const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false)

    useAsyncEffect(async (isMounted) => {
        const {data}: GraphDataResponse = await axios.get(
          "https://6ys8ajad27.execute-api.us-east-1.amazonaws.com/"
        );
        if (!isMounted) return;
        setData(data.data.september_18);
    }, []);

    return !data.length ? (
        <>Waiting for data...</>
    ) : (
        <div className={styles.graphContainer}>
            <div className="w-full flex justify-between">
                <h5 className={"text-h5"}>Bilanzkreis A Graph</h5> {/* TODO add real title */}
                {showNewTabButton &&
                <a href="#/graph-details" title="Open in new tab">
                    <OpenInNewTabIcon className="w-4 h-4 text-[#494B51]"/>
                </a>
                }
            </div>
            <div className={"block w-full h-full mt-5-1/8"}>
                <Tabs className="w-full h-20 mt-5-1/8" type="small" tabs={[IconTimeline, IconEqualizer, IconStackedLineChart]} panels={[LineChart, BarChart, AreaChart]} />
                <div className="mx-5">
                    <Button variant={"icon"} onClick={() => setIsSaveModalOpen(true)}><EditIcon></EditIcon></Button>
                    <Button variant={"icon"} onClick={() => setIsEditModalOpen(true)}><InsertDriveFileIcon></InsertDriveFileIcon></Button>
                </div>
            </div>

            <Modal isOpen={isSaveModalOpen} title={"Als Datei speichern"} onClose={() => setIsSaveModalOpen(false)}>
                <SaveFileTemplate></SaveFileTemplate>
            </Modal>

            <Modal isOpen={isEditModalOpen} title={"Zeitreihen bearbeiten"} onClose={() => setIsEditModalOpen(false)}>
                <EditTimeSeriesTemplate></EditTimeSeriesTemplate>
            </Modal>
        </div>
    );
}

export default Graph;
