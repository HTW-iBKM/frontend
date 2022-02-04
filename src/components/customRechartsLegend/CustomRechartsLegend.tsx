import React from 'react';
import { useStore } from '../../store/Store';

type CustomRechartsLegendProps = {
    payload?: any
}

function CustomRechartsLegend({ payload }: CustomRechartsLegendProps) {
    const [dateTitle] = useStore((state) => [state.dateTitle])

    return (
        // HACKED! Used spans and labels because the library doesnt display the elements if they are divs!  
        // Furthermore the CSS shown in the frontend will differ from the output img.  

        <ul className="recharts-default-legend" style={{ padding: '0px', margin: '0px', textAlign: 'center' }}>

            <h2><b>Vom: {dateTitle.value} &nbsp; (Interval: {dateTitle.interval})</b></h2>

            {
                payload?.map((entry: any, index: number) => {
                    const color = payload[index].color;
                    return (
                        <span key={`legend-item-${index}`} style={{ margin: 5, color, display: "inline-block" }}>
                            <span style={{ display: "flex", alignSelf: "end", justifySelf: "end" }}>
                                <span>{entry.value}</span>
                                <span style={{
                                    marginLeft: "1px",
                                    display: "flex", backgroundColor: "inherit", width: 16, height: 8, alignSelf: "end",
                                    alignItems: "center",
                                    marginRight: "2px", transform: "translate(-20,0)"
                                }}>
                                    <label style={{ borderTop: `solid ${color}`, flex: 1, borderTopWidth: 3 }}>
                                    </label>
                                    <label style={{ height: 8, width: 8, border: `1px solid ${color}`, borderRadius: 5 }}>

                                    </label>
                                    <label style={{ borderTop: `solid ${color}`, flex: 1, borderTopWidth: 3 }}>

                                    </label>
                                </span>

                            </span>

                        </span>
                    );
                })
            }

        </ul>
    )

}

export default CustomRechartsLegend;