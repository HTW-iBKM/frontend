import React from 'react';
import { GraphData } from '../graph/Graph';
import { formatTooltipLabel } from '../graph/helpers';

type AiToolProps = {
    payload: (undefined | {
        payload: { [key: string]: any }
    }[]),
    keyData: any,
    graphColors: string[],
    timespan: string,
} | undefined

function AIToolTipp(properties: AiToolProps): React.ReactElement {

    const colors = properties?.graphColors;
    const payload = properties ? { ...properties.payload?.[0]?.payload } : {};
    const notIncluding = ['ground_truth', 'prediction', 'time', 'berlin_time'];
    let currentValues = [];
    for (const key in payload) {
        if (notIncluding.includes(key)) continue;
        currentValues.push({ key, value: payload[key as keyof GraphData] as number })
    }
    currentValues.sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
    currentValues = currentValues.slice(0, 5);
    const toolTitle = formatTooltipLabel(payload?.berlin_time || payload?.time, properties!.timespan === 'day')
    const keyData = properties?.keyData;




    return <div
        className='tool-tipp'
    >
        <b className='tool-tipp-date'>{`${toolTitle}`}</b>
        <div
            className='tool-tipp-data'
        >

            {
                keyData && keyData.find((ele: any) => ele.key === 'ground_truth')?.checked && <>
                    <div className='data-box first-box' style={{ backgroundColor: colors ? colors.length > 1 ? colors[1] : colors[0] : '' }}></div>
                    <label className='tool-tipp-label'>Ground Truth:</label>
                    <label className='tool-tipp-label'>{payload.ground_truth} KW</label>
                </>
            }

            {
                keyData && keyData.find((ele: any) => ele.key === 'prediction')?.checked && <>
                    <div className='data-box ' style={{ backgroundColor: colors ? colors[0] : '' }}></div>
                    <label className='tool-tipp-label'>Prediction:</label>
                    <label className='tool-tipp-label'>{payload.prediction} KW</label>


                    <div className='prediction-vertical-line'></div>
                    <div className='prediction-data'>
                        {currentValues.map((ele, index) => {
                            // eslint-disable-next-line react/jsx-key
                            return (<React.Fragment key={index}>
                                <div className='prediction-data-chevron-wrapper'>
                                    {ele.value > 0 ?
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="green" viewBox="0 0 24 24" stroke="green">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} d="M5 15l7-7 7 7" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="red" viewBox="0 0 24 24" stroke="red">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    }
                                </div>
                                {/* The column has a typo thats why iam lowercassing it here */}
                                <div className='prediction-data-label'>{(ele.key).replace('Nachgelagerte', 'nachgelagerte')}</div>
                                <div className='prediction-data-value'>{(ele.value * 100).toFixed(0) + "%"}</div>

                            </React.Fragment>)
                        }
                        )}

                    </div>
                </>
            }

        </div>

        {/* <div style={{
            display: 'flex', 


            justifyContent: 'space-between'
        }}>
            <div style={{
                width: 16,
                height: 16,
                backgroundColor: colors ? colors[0] : '',
                fontSize: 14,

            }} />
            <span
            >Prediction:</span>
            <span
                style={
                    {
                        marginRight: 10
                    }
                }
            >
                {payload.prediction}
            </span>
        </div> */}

        {/* <div style={{
            flex: 1,
            // backgroundColor: "black",
            marginLeft: 9,
            marginTop: 3,
            marginBottom: 5,
            borderLeft: '1px solid #C1C1C6',
            display: 'flex',
            justifyContent: "center"
        }}>
            <div style={
                {
                    width: "90%"
                }
            }>
                {currentValues.map((ele, index) => {
                    // eslint-disable-next-line react/jsx-key
                    return (<div style={{ display: "flex", fontSize: 12, justifyContent: 'space-between' }}>
                        <div style={{ width: 120, }}>{index + 1}.&nbsp;{ele.key}</div>
                        <div>{(ele.value * 100).toFixed(0) + "%"}</div>

                        <div>
                            {ele.value > 0 ?
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="green" viewBox="0 0 24 24" stroke="green">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} d="M5 15l7-7 7 7" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="red" viewBox="0 0 24 24" stroke="red">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} d="M19 9l-7 7-7-7" />
                                </svg>
                            }
                        </div>


                    </div>)
                }
                )}
            </div>


        </div> */}




    </div>
}
export default AIToolTipp;
