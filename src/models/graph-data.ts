export class GraphData {
    constructor(public time: string,
                public daily_cos: string,
                public weekly_sin: string,
                public forecast_2: object,
                public daily_sin: string,
                public weekly_cos: string,
                public intercept: string,
                public prediction: string,
                public ground_truth: string,
                public sumFeature: number,
                public day_hour: number,
                public weekday: number,
                public sun: number,
                public pressure: number
    ) {


    }

}
