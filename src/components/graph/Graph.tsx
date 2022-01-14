import React, {ReactElement, useEffect, useCallback, useState} from 'react';
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

export enum GraphKey {
    PREDICTION = 'prediction',
    GROUND_TRUTH = 'ground_truth'
}

export interface KeyData {
    key: GraphKey,
    name: string,
    checked: boolean
}

interface IntervalOption {
  value: string,
  label: string,
  disabled: boolean,
  interval: number
}

interface TimespanOption {
  value: string,
  label: string,
  disabled: boolean,
  timespan: number
}

function Graph(): ReactElement {

    const styles = {
        graphContainer: "w-[calc(100%-3.5rem)] h-[calc(100%-3.5rem)] m-7 flex justify-center items-center flex-col ",
        loadingCommonStyle: "bg-[#E9EAF0] rounded-lg"
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

  const [intervalOptions, setIntervalOptions] = useState<IntervalOption[]>([
    {value: 'minutes', label: '15 Minuten', disabled: false, interval: 1},
    {value: 'hour', label: 'Stunde', disabled: false, interval: 4},
    {value: 'day', label: 'Tag', disabled: false, interval: 4 * 24},
    {value: 'week', label: 'Woche', disabled: false, interval: 4 * 24 * 7},
    {value: 'month', label: 'Monat', disabled: false, interval: 4 * 24 * 7 * 30}
  ]);

  const [interval, setInterval] = useState<string>('minutes');
  const IntervalSelectField = <div className="flex items-center gap-3" key="interval">
    <span className="text-body2">Intervall:</span>
    <SelectField className="min-w-[116px]"
                 variant="small" label="Intervall auswählen"
                 options={intervalOptions} defaultValue={intervalOptions.find(o => o.value === interval)}
                 onChange={(option: string) => setInterval(option)}/>
  </div>;

  const [timespanOptions, setTimespanOptions] = useState<TimespanOption[]>([
    {value: 'day', label: 'Tag', disabled: false, timespan: 1},
    {value: 'week', label: 'Woche', disabled: false, timespan: 7},
    {value: 'month', label: 'Monat', disabled: false, timespan: 30},
    {value: 'year', label: 'Jahr', disabled: false, timespan: 365},
    {value: 'calendar', label: 'Kalender', disabled: false, timespan: 0}
  ]);

  const [selectedTimespan, _setSelectedTimespan] = useState<string>('day');
  const [timespan, setTimespan] = useState<{startDate: Date, endDate: Date}>({
    startDate: new Date(),
    endDate: new Date()
  });

  const setSelectedTimespan = (option: string) => {
    const timespanOption = timespanOptions.find(o => o.value === option);
    const startDate = new Date();
    const endDate = new Date();
    if (timespanOption && option !== 'calendar') {
      startDate.setDate(startDate.getDate() - timespanOption.timespan * 1000 * 60 * 60 * 24);
      setTimespan({startDate, endDate});
      setCalenderOptionLabel('Kalender');
    }
    _setSelectedTimespan(option);
  };
  const setCalendarTimespan = (dates: Date[]) => {
    setCalenderOptionLabel(dates.map((date, index) => date.toLocaleDateString(undefined, {
      year: index === 0 && dates[0].getFullYear() === dates[1].getFullYear() ? undefined : 'numeric',
      month: '2-digit',
      day: '2-digit',
    })).join('-'));

    setTimespan({startDate: dates[0], endDate: dates[1]});
  };
  const setCalenderOptionLabel = (value: string) => {
    setTimespanOptions((options: TimespanOption[]) => {
      const calendarOption = options.find(o => o.value === 'calendar');
      if (calendarOption) {
        calendarOption.label = value;
      }
      return options;
    });
  };

  const TimespanSelectField = <div className="flex items-center gap-3" key="timespan">
    <span className="text-body2">Zeitraum:</span>
    <SelectField className="min-w-[116px]"
                 variant="small" label="Zeitraum auswählen"
                 options={timespanOptions} defaultValue={timespanOptions.find(o => o.value === selectedTimespan)}
                 onChange={(option: string) => setSelectedTimespan(option)}/>
    {selectedTimespan === 'calendar' &&
    <DatePicker onChange={(value: Date[]) => value.length === 2 && setCalendarTimespan(value)}/>}
  </div>;

  const setDisabledFields = () => {
    setIntervalOptions(options => {
      const dayOption = options.find(o => o.value === 'day');
      const weekOption = options.find(o => o.value === 'week');
      const monthOption = options.find(o => o.value === 'month');
      if (dayOption && weekOption && monthOption) {
        dayOption.disabled = selectedTimespan === 'day';
        weekOption.disabled = selectedTimespan === 'day' || selectedTimespan === 'week';
        monthOption.disabled = selectedTimespan === 'day' || selectedTimespan === 'week' || selectedTimespan === 'month';
      }

      return options;
    });
    setTimespanOptions(options => {
      const dayOption = options.find(o => o.value === 'day');
      const weekOption = options.find(o => o.value === 'week');
      const monthOption = options.find(o => o.value === 'month');
      if (dayOption && weekOption && monthOption) {
        dayOption.disabled = interval === 'day' || interval === 'week' || interval === 'month';
        weekOption.disabled = interval === 'week' || interval === 'month';
        monthOption.disabled = interval === 'month';
      }
      return options;
    });
  }

  useEffect(() => setDisabledFields(), [selectedTimespan, interval]);

  // TODO apply formatData to graphData once we have more than a day of data
  const formatData = (graphData: GraphData[]): GraphData[] => {
    const selectedInterval = intervalOptions.find(option => option.value === interval);
    return graphData
    .filter(data => new Date(data.time) >= timespan.startDate && new Date(data.time) <= timespan.endDate)
    .filter((data, index) => selectedInterval && index % selectedInterval.interval === 0);
  };

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

  const IconTimeline = <TimelineIcon className={'h-5 w-5'}/>;
  const IconEqualizer = <EqualizerIcon className={'h-5 w-5'}/>;
  const IconStackedLineChart = <StackedLineChartIcon className={'h-5 w-5'}/>;

  const LineChart = <LineChartPanel data={data} ref={lineChartRef} graphLineColors={GraphLineColors} keyData={keyData}/>;
  const BarChart = <BarChartPanel data={data} ref={barChartRef} graphLineColors={GraphLineColors} keyData={keyData}/>;
  const AreaChart = <AreaChartPanel data={data} ref={areaChartRef} graphLineColors={GraphLineColors} keyData={keyData}/>;

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);

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
    }, []
  );

    return !data.length ? (
        <div className={styles.graphContainer}>
            <div className="w-full h-full animate-pulse-dramatic flex flex-col justify-between">
                <div className={`h-8 w-1/3 ${styles.loadingCommonStyle}`}></div>
                <div className={`mt-5 h-8 ${styles.loadingCommonStyle}`}></div>
                <div className={`mt-7 h-5 flex-1 ${styles.loadingCommonStyle}`}></div>
                <div className={`mt-9 border border-grayscale-disabled ${styles.loadingCommonStyle}`}></div>
                <div className="mt-6 flex gap-5">
                    <div className={`w-2/3 h-8 ${styles.loadingCommonStyle}`}></div>
                    <div className={`w-1/3 h-8 ${styles.loadingCommonStyle}`}></div>
                </div>
            </div>
        </div>
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
                <Tabs className="w-full h-20 mt-5-1/8"
                      label="Graph:"
                      type="small"
                      onTabChange={setActiveGraph}
                      tabs={[
                          {title: IconTimeline, accessor: 'line_chart'},
                          {title: IconEqualizer, accessor: 'bar_chart'},
                          {title: IconStackedLineChart, accessor: 'area_chart'}
                      ]}
                      panels={[LineChart, BarChart, AreaChart]}
                      inlineSelectFields={[IntervalSelectField, TimespanSelectField]}/>
            </div>
            <div className="border border-disabled w-full m-6"/>
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
                <SaveFileTemplate activeGraph={activeGraph} onSaveFile={saveFile} setModalOpen={setIsSaveModalOpen}></SaveFileTemplate>
            </Modal>

            <Modal isOpen={isEditModalOpen} title={"Zeitreihen bearbeiten"} onClose={() => setIsEditModalOpen(false)}>
                <EditTimeSeriesTemplate keyData={keyData} setKeyData={setKeyData} setModalOpen={setIsEditModalOpen}></EditTimeSeriesTemplate>
            </Modal>
        </div>
    );
}

export default Graph;
