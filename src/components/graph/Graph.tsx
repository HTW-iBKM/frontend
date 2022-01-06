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
import SelectField from '../../components/form/SelectField';
import DatePicker from '../../components/datePicker/DatePicker';

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

enum GraphKey {
    PREDICTION = 'prediction',
    GROUND_TRUTH = 'ground_truth'
}

interface KeyData {
    key: GraphKey,
    name: string
}

interface TimespanOption {
  value: string,
  label: string,
  timespan: number
}

const timespanOptions: TimespanOption[] = [
  { value: 'day', label: 'Tag', timespan: 1},
  { value: 'week', label: 'Woche', timespan: 7},
  { value: 'month', label: 'Monat', timespan: 30},
  { value: 'year', label: 'Jahr', timespan: 365},
  { value: 'calendar', label: 'Kalender', timespan: 0}
];

function Graph(): ReactElement {
    const styles = {
        graphContainer:
          "w-[calc(100%-3.5rem)] h-[calc(100%-3.5rem)] m-7 flex justify-center items-center flex-col ",
    };
    const GraphLineColors = ["#4074B2", "#DE9D28", "#edabd1", "#92dbd0"];

    const KeyData: KeyData[] = [
        {key: GraphKey.PREDICTION, name: 'Prognose'},
        {key: GraphKey.GROUND_TRUTH, name: 'Tatsächlicher Verbrauch'}
    ];

    const url = window.location.href.split('/')[4];
    const showNewTabButton = url !== 'graph-details';

    const [data, setData] = useState<GraphData[]>([]);
    const [selectedTimespan, _setSelectedTimespan] = useState<string>('');
    const [timespan, setTimespan] = useState<{startDate: Date, endDate: Date}>({startDate: new Date(), endDate: new Date()});
    const setSelectedTimespan = (timespan: string) => {
      const timespanOption = timespanOptions.find(option => option.value === timespan);
      const startDate = new Date();
      const endDate = new Date();
      if (timespanOption && timespan !== 'calendar') {
        startDate.setDate(startDate.getDate() - timespanOption.timespan * 1000 * 60 * 60 * 24);
        setTimespan({startDate, endDate});
        setCalenderOptionLabel('Kalender');
      }
      _setSelectedTimespan(timespan);
    }

  const [calendarTimespan, _setCalendarTimespan] = useState<{startDate: Date, endDate: Date}>({startDate: new Date(), endDate: new Date()});
  const setCalendarTimespan = (dates: Date[]) => {
    setCalenderOptionLabel(dates.map((date, index) => date.toLocaleDateString(undefined, {
      year: index === 0 && dates[0].getFullYear() === dates[1].getFullYear() ? undefined : "numeric",
      month: "2-digit",
      day: "2-digit",
    })).join('-'));

    const timespan = {startDate: dates[0], endDate: dates[1]};
    _setCalendarTimespan(timespan);
    setTimespan(timespan);
  }

  const setCalenderOptionLabel = (value: string) => {
    const calendarOption = timespanOptions.find(option => option.value === 'calendar');
    if (calendarOption) {
      calendarOption.label = value;
    }
  }

  const formatData = (graphData: GraphData[]): GraphData[] => {
    return graphData.filter(data => new Date(data.time) >= timespan.startDate && new Date(data.time) <= timespan.endDate);
  };

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
            <div className="w-full flex justify-between items-center">
              <div className={"block w-full h-full mt-5-1/8"}>
                <Tabs className="w-full h-20 mt-5-1/8" type="small" tabs={[IconTimeline, IconEqualizer, IconStackedLineChart]} panels={[LineChart, BarChart, AreaChart]} />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-body2">Zeitraum:</span>
                <SelectField variant="small" label="Zeitraum auswählen"
                             options={timespanOptions}
                             onChange={(option: string) => setSelectedTimespan(option)}/>
                {selectedTimespan === 'calendar' &&
                <DatePicker onChange={(value: Date[]) => value.length === 2 && setCalendarTimespan(value)}/>}
              </div>
            </div>
            <div className="border border-[#E2E2E2] w-full m-5"/>
            <div className="w-full flex justify-center">
                {KeyData.map((data: KeyData, index: number) =>
                  <div key={index} className="min-w-max flex items-center gap-3 mx-5">
                      <span className={`w-5 h-5 rounded-[2px]`} style={{backgroundColor: GraphLineColors[index]}}/>
                      <span className="text-body1">{data.name}</span>
                  </div>
                )}
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
