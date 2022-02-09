import React, { ReactElement, useCallback, useEffect, useState } from 'react';
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
import { useCurrentPng } from "recharts-to-png";
import FileSaver from 'file-saver';
import { ExportToCsv } from 'export-to-csv';
import SelectField from '../../components/form/SelectField';
import DatePicker from '../../components/datePicker/DatePicker';
import '../aiToolTipp/AIToolTipp.css';
import { GraphDetailsProps } from '../../sites/graph-details/GraphDetails';
import { aggregateGraphData, formatDate } from './helpers';
import { useHistory, useLocation } from 'react-router-dom';
import { useStore } from '../../store/Store';


export interface GraphData {
    time: string;
    berlin_time: string;
    'BK-Verbrauch': number,
    'Sonnenenergie': number,
    'Synthetische Daten': number,
    'Tageszeit': number,
    'Wochentag': number,
    'Vor und Nachgelagerte Netze': number,
    'Windenergie': number,
    prediction: number;
    ground_truth: number;
}

export interface GraphDataResponse {
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
    disabled: boolean
}

interface TimespanOption {
    value: string,
    label: string,
    disabled: boolean,
    timespan: number
}

interface GraphProps {
    group: string,
    header: string,
    data: GraphData[]
}

function Graph({ data = [], header = "Graph", group }: GraphProps): ReactElement {
    const history = useHistory();
    const [setDateTitle] = useStore((state) => [state.setDateTitle])
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const queryKeyData = JSON.parse(query.get('keyData')!)
    const queryInterval = query.get('interval');
    const queryActiveGraph = query.get('activeGraph');
    const queryTimespan = query.get('selectedTimeSpan')!;
    const [legenProps, setLegendProps] = useStore(state => [state.legendProperties, state.setLegendProperties])
    const styles = {
        graphContainer: "w-full h-full p-7 flex justify-center items-center flex-col ",
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
        { key: GraphKey.PREDICTION, name: 'Prognose', checked: queryKeyData ? queryKeyData[0]?.checked : true },
        { key: GraphKey.GROUND_TRUTH, name: 'Tatsächlicher Verbrauch', checked: queryKeyData && queryKeyData[1] ? queryKeyData[1]?.checked : true }
    ];

    const [keyData, setKeyData] = useState(KeyDataDefault)

    const url = window.location.href.split('/')[4];
    const showNewTabButton = url !== 'graph-details';

    const [activeGraph, setActiveGraph] = useState<string>(queryActiveGraph || String);

    const [intervalOptions, setIntervalOptions] = useState<IntervalOption[]>([
        { value: 'minutes', label: '15 Minuten', disabled: false },
        { value: 'hour', label: 'Stunde', disabled: false },
        { value: 'day', label: 'Tag', disabled: false },
        { value: 'week', label: 'Woche', disabled: false },
        { value: 'month', label: 'Monat', disabled: false }
    ]);

    const [interval, setInterval] = useState<string>(queryInterval || 'minutes');
    const IntervalSelectField = <div className="flex items-center gap-3" key="interval">
        <span className="text-body2">Intervall:</span>
        <SelectField className="min-w-[124px]"
            variant="small" label="Intervall auswählen"
            options={intervalOptions} value={intervalOptions.find(o => o.value === interval) || intervalOptions[0]}
            onChange={(option: string) => setInterval(option)} />
    </div>;

    const [timespanOptions, setTimespanOptions] = useState<TimespanOption[]>([
        { value: 'day', label: 'Tag', disabled: false, timespan: 1 },
        { value: 'week', label: 'Woche', disabled: false, timespan: 7 },
        { value: 'month', label: 'Monat', disabled: false, timespan: 30 },
        { value: 'year', label: 'Jahr', disabled: false, timespan: 365 },
        { value: 'calendar', label: 'Kalender', disabled: false, timespan: 0 }
    ]);

    const [selectedTimespan, _setSelectedTimespan] = useState<string>(queryTimespan || 'day');
    const [timespan, setTimespan] = useState<{ startDate: Date, endDate: Date }>({
        startDate: new Date(),
        endDate: new Date()
    });

    const setSelectedTimespan = (option: string) => {
        if (option === 'year' || option === 'month') {
            if (interval === 'minutes' || interval === 'hour') {
                setInterval('day');
            }
        }

        const timespanOption = timespanOptions.find(o => o.value === option);
        if (timespanOption && option !== 'calendar') {
            const startDate = new Date(data[data.length - 1].time);
            const endDate = new Date(data[data.length - 1].time);

            startDate.setDate(startDate.getDate() - timespanOption.timespan);
            setTimespan({ startDate, endDate });
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

        setTimespan({ startDate: dates[0], endDate: dates[1] });
        setDisabledFieldsCalendar(dates[0], dates[1]);
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
        <SelectField className="min-w-[124px]"
            variant="small" label="Zeitraum auswählen"
            options={timespanOptions} value={timespanOptions.find(o => o.value === selectedTimespan) || intervalOptions[0]}
            onChange={(option: string) => setSelectedTimespan(option)} />
        {selectedTimespan === 'calendar' &&
            <DatePicker onChange={(value: Date[]) => value.length === 2 && setCalendarTimespan(value)} />}
    </div>;

    const disableIntervalFields = () => {
        setIntervalOptions(options => {
            const minutesOption = options.find(o => o.value === 'minutes');
            const hourOption = options.find(o => o.value === 'hour');
            const dayOption = options.find(o => o.value === 'day');
            const weekOption = options.find(o => o.value === 'week');
            const monthOption = options.find(o => o.value === 'month');
            if (minutesOption && hourOption && dayOption && weekOption && monthOption) {
                minutesOption.disabled = selectedTimespan === 'year' || selectedTimespan === 'month';
                hourOption.disabled = selectedTimespan === 'year' || selectedTimespan === 'month';
                dayOption.disabled = selectedTimespan === 'day';
                weekOption.disabled = selectedTimespan === 'day' || selectedTimespan === 'week';
                monthOption.disabled = selectedTimespan === 'day' || selectedTimespan === 'week' || selectedTimespan === 'month';
            }

            return options;
        });
    }

    const disableTimespanFields = () => {
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

    const setDisabledFieldsCalendar = (startDate: Date, endDate: Date) => {
        const timeDifference = Math.abs(startDate.getTime() - endDate.getTime());
        const differenceInDays = timeDifference / (1000 * 3600 * 24);
        setIntervalOptions(options => {
            const dayOption = options.find(o => o.value === 'day');
            const weekOption = options.find(o => o.value === 'week');
            const monthOption = options.find(o => o.value === 'month');
            if (dayOption && weekOption && monthOption) {
                dayOption.disabled = differenceInDays === 1;
                weekOption.disabled = differenceInDays <= 7;
                monthOption.disabled = differenceInDays <= 30;
            }
            return options;
        });
    }

    useEffect(() => {
        if (data.length > 0) {
            setKeyData(KeyDataDefault.filter((keyData) => Object.keys(data[0]).includes(keyData.key)));
            setSelectedTimespan(queryTimespan || 'day');
            setInterval(queryInterval || 'minutes');
        }
    }, [data]);

    useEffect(() => disableTimespanFields(), [interval]);
    useEffect(() => disableIntervalFields(), [timespan]);

    const formatData = (graphData: GraphData[]) => {
        return aggregateGraphData(
            graphData.filter(data => new Date(data.time) >= timespan.startDate && new Date(data.time) <= timespan.endDate),
            interval
        );
    }

    const [getLineChartPng, { ref: lineChartRef }] = useCurrentPng();
    const [getBarChartPng, { ref: barChartRef }] = useCurrentPng();
    const [getAreaChartPng, { ref: areaChartRef }] = useCurrentPng();

    const handlePngDownload = useCallback(async (fileName: string, currentGraph: string) => {
        let png;
        switch (currentGraph) {
            case 'line_chart':
                // show legend for img
                setLegendProps({ ...legenProps, show: true })
                //wait for legend to render in the html else it will not be displayed in the img.
                await (new Promise((resolve) => setTimeout(() => resolve(true), 200)))
                png = await getLineChartPng();
                // disable legend after including it in the image
                setLegendProps({ ...legenProps, show: false })
                break;
            case 'bar_chart':
                setLegendProps({ ...legenProps, show: true })
                await (new Promise((resolve) => setTimeout(() => resolve(true), 200)))
                png = await getBarChartPng();
                setLegendProps({ ...legenProps, show: false })

                break;
            case 'area_chart':
                setLegendProps({ ...legenProps, show: true })
                await (new Promise((resolve) => setTimeout(() => resolve(true), 200)))
                png = await getAreaChartPng();
                setLegendProps({ ...legenProps, show: false })
                break;
        }
        if (png) FileSaver.saveAs(png, `${fileName}.png`);
    }, [getLineChartPng]);

    const IconTimeline = <TimelineIcon className={'h-5 w-5'} />;
    const IconEqualizer = <EqualizerIcon className={'h-5 w-5'} />;
    const IconStackedLineChart = <StackedLineChartIcon className={'h-5 w-5'} />;
    const handleCsvDownload = (filename: string, timeSeries: string[]) => {
        timeSeries.push("time");
        const dataToBeFiltered = JSON.parse(JSON.stringify(data));
        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: false,
            showTitle: false,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
            filename: filename
        };

        const csvExporter = new ExportToCsv(options);
        const filterData = (data: GraphData[], timeSeries: string[]) => {
            for (const i in data) {
                Object.keys(data[i]).forEach((key) => {
                    if (!timeSeries.includes(key)) {
                        delete data[i][key as keyof GraphData];
                    }
                })
            }
        }

        filterData(dataToBeFiltered, timeSeries);
        csvExporter.generateCsv(dataToBeFiltered);
    }

    const LineChart = <LineChartPanel data={formatData(data)} ref={lineChartRef} graphLineColors={GraphLineColors} keyData={keyData} interval={interval} />;
    const BarChart = <BarChartPanel data={formatData(data)} ref={barChartRef} graphLineColors={GraphLineColors} keyData={keyData} interval={interval} />;
    const AreaChart = <AreaChartPanel data={formatData(data)} ref={areaChartRef} graphLineColors={GraphLineColors} keyData={keyData} interval={interval} />;

    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);

    const saveFile = async (fileName: string, fileType: string, currentGraph: string, timeSeries: string[]) => {
        fileType === 'PNG'
            ? await handlePngDownload(fileName, currentGraph)
            : null;
        fileType === 'CSV'
            ? await handleCsvDownload(fileName, timeSeries)
            : null;
    }


    const queryString = `?activeGraph=${activeGraph}&interval=${interval}&selectedTimeSpan=${selectedTimespan}&keyData=${JSON.stringify(keyData)}`;
    /**
     * Opens the graph in a new tab.
     */
    const openInTab = () => {
        const graphDetails: GraphDetailsProps = {
            group: group,
            header: header,
            data: data
        }
        localStorage.removeItem("graphData");
        localStorage.setItem("graphData", JSON.stringify(graphDetails));
        const newWindow = window.open(`#/graph-details${queryString}`, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    useEffect(() => {
        history.push({ search: queryString })
    }, [queryString])

    const subtitle = (() => {
        let formated = '';
        switch (selectedTimespan) {
            case 'day': {
                const date = new Date(data[data.length - 1]?.time);
                formated = formatDate(date);
                break;
            }
            default: {
                const { startDate, endDate } = timespan;
                formated = `${formatDate(startDate)} - ${formatDate(endDate)}`
                break;
            }
        }

        return formated
    })()
    useEffect(() => setDateTitle({
        timespan: selectedTimespan, value: subtitle,
        interval: intervalOptions.find((item) => item.value === interval)?.label || ""
    }), [subtitle])



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
                <h5 className={"text-h5"}>{header}
                    <small className={"text-subtitle2 ml-2"}>({

                        subtitle
                    })</small>
                </h5>


                {/* TODO add real title */}
                {showNewTabButton &&
                    <Button variant={"icon"}
                        onClick={() => openInTab()}
                        title="Open in new tab">
                        <OpenInNewTabIcon className="w-4 h-4" />
                    </Button>
                }
            </div>
            <div className={"block w-full h-full mt-5-1/8"}>
                <Tabs className="w-full h-20 mt-5-1/8"
                    label="Graph:"
                    type="small"
                    onTabChange={setActiveGraph}
                    tabs={[
                        { title: IconTimeline, accessor: 'line_chart' },
                        { title: IconEqualizer, accessor: 'bar_chart' },
                        { title: IconStackedLineChart, accessor: 'area_chart' }
                    ]}
                    panels={[LineChart, BarChart, AreaChart]}
                    index={queryActiveGraph &&
                        queryActiveGraph === 'line_chart' ?
                        0 : queryActiveGraph === 'bar_chart' ? 1
                            : queryActiveGraph === 'area_chart' ? 2 : 0 || 0}
                    inlineSelectFields={[IntervalSelectField, TimespanSelectField]} />
            </div>
            <div className="bg-[#E2E2E2] w-full h-0.5 m-6" />
            <div className="w-full flex justify-center flex-wrap">
                {keyData.map((data: KeyData, index: number) =>
                    data.checked &&
                    <div key={index} className="min-w-max flex items-center gap-3 mx-7">
                        <span className={`w-4 h-4 rounded-[2px]`} style={{ backgroundColor: GraphLineColors[index] }} />
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
        </div >
    );
}

export default Graph;
