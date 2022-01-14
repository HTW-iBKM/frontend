import React, {ReactElement, useCallback, useState} from 'react';
import axios from 'axios';
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
import {useCurrentPng} from "recharts-to-png";
import FileSaver from 'file-saver';

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

export enum GraphKey {
    PREDICTION = 'prediction',
    GROUND_TRUTH = 'ground_truth'
}

export interface KeyData {
    key: GraphKey,
    name: string,
    checked: boolean
}

function Graph(): ReactElement {
    const styles = {
        graphContainer:
          "w-full h-full p-7 flex justify-center items-center flex-col ",
    };

    /**
     * Definition of the line available colors.
     */
    const GraphLineColors = ["#4074B2", "#DE9D28", "#edabd1", "#92dbd0"];

    /**
     * Inititial key data definition.
     */
    const KeyDataDefault: KeyData[] = [
        {key: GraphKey.PREDICTION, name: 'Prognose', checked: true},
        {key: GraphKey.GROUND_TRUTH, name: 'Tatsächlicher Verbrauch', checked: true}
    ];
    const [keyData, setKeyData] = useState(KeyDataDefault)

    const url = window.location.href.split('/')[4];
    const showNewTabButton = url !== 'graph-details';

    const [data, setData] = useState<GraphData[]>([]);
    const [activeGraph, setActiveGraph] = useState<string>(String);

    const IconTimeline = <><TimelineIcon className={"h-5 w-5"}/></>
    const IconEqualizer = <><EqualizerIcon className={"h-5 w-5"}/></>
    const IconStackedLineChart = <><StackedLineChartIcon className={"h-5 w-5"}/></>

    const [getLineChartPng, { ref: lineChartRef }] = useCurrentPng();
    const [getBarChartPng, { ref: barChartRef }] = useCurrentPng();
    const [getAreaChartPng, { ref: areaChartRef }] = useCurrentPng();

    const handlePngDownload = useCallback(async (fileName: string, currentGraph: string) => {
        let png;
        switch (currentGraph) {
            case 'line_chart':
                png =  await getLineChartPng();
                break;
            case 'bar_chart':
                png =  await getBarChartPng();
                break;
            case 'area_chart':
                png =  await getAreaChartPng();
                break;
        }
        if (png) FileSaver.saveAs(png, `${fileName}.png`);
    }, [getLineChartPng]);


    const LineChartComponent = <><LineChartPanel data={data} ref={lineChartRef} graphLineColors={GraphLineColors} keyData={keyData}/></>;
    const BarChart = <><BarChartPanel data={data} ref={barChartRef} graphLineColors={GraphLineColors} keyData={keyData}/></>
    const AreaChart = <><AreaChartPanel data={data} ref={areaChartRef} graphLineColors={GraphLineColors} keyData={keyData}/></>

    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
    const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false)

    const saveFile = async (fileName: string, fileType: string, currentGraph: string) => {
        fileType === 'PNG'
          ? await handlePngDownload(fileName, currentGraph)
          : null;
    }

    useAsyncEffect(async (isMounted) => {
        const {data}: GraphDataResponse = await axios.get(
          "https://6ys8ajad27.execute-api.us-east-1.amazonaws.com/"
        );
        if (!isMounted) return;
        setData(data.data.september_18);
    }, []);

    return !data.length ? (
        <div className={styles.graphContainer}>Waiting for data ...</div>
    ) : (
        <div className={styles.graphContainer}>
            <div className="w-full flex justify-between">
                <h5 className={"text-h5"}>Bilanzkreis A Graph</h5> {/* TODO add real title */}
                {showNewTabButton &&
                    <Button variant={"icon"}
                            onClick={() => window.open('#/graph-details', '_blank')}
                            title="Open in new tab">
                        <OpenInNewTabIcon className="w-4 h-4"/>
                    </Button>
                }
            </div>

            <div className={"block w-full h-full mt-5-1/8"}>
                <Tabs
                  className="w-full h-20 mt-5-1/8"
                  type="small"
                  onTabChange={setActiveGraph}
                  tabs={[
                    {title: IconTimeline, accessor: 'line_chart'},
                    {title: IconEqualizer, accessor: 'bar_chart'},
                    {title: IconStackedLineChart, accessor: 'area_chart'}
                  ]}
                  panels={[LineChartComponent, BarChart, AreaChart]} />
            </div>
            <div className="border border-[#E2E2E2] w-full m-6"/>
            <div className="w-full flex justify-center flex-wrap">
                {keyData.map((data: KeyData, index: number) =>
                    data.checked &&
                        <div key={index} className="min-w-max flex items-center gap-3 mx-7">
                            <span className={`w-4 h-4 rounded-[2px]`} style={{backgroundColor: GraphLineColors[index]}}/>
                            <span className="text-body1">{data.name}</span>
                        </div>
                )}
                <div className="mx-5 flex gap-7">
                    <Button variant={"icon"} onClick={() => setIsEditModalOpen(true)}><EditIcon></EditIcon></Button>
                    <Button variant={"icon"} onClick={() => setIsSaveModalOpen(true)}><InsertDriveFileIcon></InsertDriveFileIcon></Button>
                </div>
            </div>

            <Modal isOpen={isSaveModalOpen} title={"Als Datei speichern"} onClose={() => setIsSaveModalOpen(false)}>
                <SaveFileTemplate keyData={keyData} activeGraph={activeGraph} onSaveFile={saveFile} setModalOpen={setIsSaveModalOpen}></SaveFileTemplate>
            </Modal>

            <Modal isOpen={isEditModalOpen} title={"Zeitreihen bearbeiten"} onClose={() => setIsEditModalOpen(false)}>
                <EditTimeSeriesTemplate keyData={keyData} setKeyData={setKeyData} setModalOpen={setIsEditModalOpen}></EditTimeSeriesTemplate>
            </Modal>
        </div>
    );
}

export default Graph;
