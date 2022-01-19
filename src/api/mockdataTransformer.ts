
import { GraphData } from '../components/graph/Graph';
import data from '../data/aiData.json';

export function explainableAIData(): any[] {
    const customObj: { [x: string]: GraphData[] } = {};
    return data.sort((a, b) => {
        const firstDate = new Date(a.berlin_time);
        const secondDate = new Date(b.berlin_time);
        if (firstDate < secondDate) {
            return -1;
        } else if (firstDate > secondDate) {
            return 1;
        }
        return 0;
    }).map((single: { [key: string]: (string | number) }) => {
        single['time'] = single['berlin_time']
        // console.log(single)
        // delete single['berlin_time'];
        // const date = new Date(single['time']);
        // const monthNames = ["January", "February", "March", "April", "May", "June",
        //     "July", "August", "September", "October", "November", "December"
        // ].map((item) => item.toLowerCase());
        // const month_and_day = `${monthNames[date.getMonth()]}_${date.getDate() + 1}`;
        // if (!customObj[month_and_day]) customObj[month_and_day] = [];
        // customObj[month_and_day].push(single as unknown as GraphData);
        return single;
    });

    // return customObj;
}