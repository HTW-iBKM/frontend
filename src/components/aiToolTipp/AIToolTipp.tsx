import React from 'react';
import { GraphData, KeyData } from '../graph/Graph';
import { formatTooltipLabel } from '../graph/helpers';

type AiToolProps = {
    payload: (undefined | {
        payload: { [key: string]: any },
        [key: string]: any
    }[]),
    keyData: KeyData[],
    graphColors: string[],
    interval: string
} | undefined

function AIToolTipp(properties: AiToolProps): React.ReactElement {
    const predictionPayload = properties?.payload?.find((item) => item.name === 'Prognose');
    const groundTruthPayload = properties?.payload?.find((item) => item.name === 'Tatsächlicher Verbrauch')
    const features = predictionPayload?.payload || groundTruthPayload?.payload;
    const notIncluding = ['ground_truth', 'prediction', 'time', 'berlin_time'];
    let currentValues = [];
    for (const key in features) {
        if (notIncluding.includes(key)) continue;
        currentValues.push({ key, value: features[key as keyof GraphData] as number })
    }
    currentValues.sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
    currentValues = currentValues.slice(0, 5);
    const toolTitle = formatTooltipLabel(features?.time || features?.berlin_time, properties?.interval || 'hour')

    return <div
        className='tool-tipp'
    >
        <b className='tool-tipp-date'>{`${toolTitle}`}</b>
        <div
            className='tool-tipp-data'
        >

            {
                groundTruthPayload && <>
                    <div className='data-box first-box' style={{ backgroundColor: groundTruthPayload.color }}></div>
                    <label className='tool-tipp-label'>{groundTruthPayload.name}</label>
                    <label className='tool-tipp-label'>{features?.ground_truth} KW</label>
                </>
            }

            {
                predictionPayload && <>
                    <div className='data-box ' style={{ backgroundColor: predictionPayload.color }}></div>
                    <label className='tool-tipp-label'>{predictionPayload.name}:</label>
                    <label className='tool-tipp-label'>{features?.prediction} KW</label>


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
    </div>
}
export default AIToolTipp;
