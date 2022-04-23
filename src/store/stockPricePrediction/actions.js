import axios from 'axios';

export async function fetchTechnicalForecast ({ commit }, { ticker }) {
    axios.get(`https://stockprice-forecasting.herokuapp.com/technical_forecast/?ticker=${ticker}`)
        .then(res => {
            console.log(res)
            // {
            //     Forecast: 168.152
            //     'ForecastConfidence': 70
            //     'Ticker': 'AAPL'
            //     DataFrame: {
            //         Close: [189.5],
            //         Datetime: ["2022-mm-dd hh:mn:sc"],
            //         High: [],
            //         Open: [],
            //         Low: [],
            //         Volume: []
            //         }
            //     }
            var csData = []
            for (let i = 0; i < res.data.DataFrame.Close.length; i++) {
                const el = {
                    x: new Date(res.data.DataFrame.Datetime[i]),
                    y: [parseFloat(res.data.DataFrame.Open[i]).toFixed(2), parseFloat(res.data.DataFrame.High[i]).toFixed(2), parseFloat(res.data.DataFrame.Low[i]).toFixed(2), parseFloat(res.data.DataFrame.Close[i]).toFixed(2)]
                }
                csData.push(el);
            }
            var lineData = [{x: new Date(res.data.DataFrame.Datetime[0]), y:parseFloat(res.data.Forecast).toFixed(2)}, {x: new Date(res.data.DataFrame.Datetime[res.data.DataFrame.Datetime.length-1]), y: parseFloat(res.data.Forecast).toFixed(2)}]
            console.log(csData)
            console.log(lineData)
            // Forecast & confidence
            var forecast = parseFloat(res.data.Forecast).toFixed(2);
            var confidence = res.data.ForecastConfidence;
            // If outside of market hours or not
            var outOfMH = false;
            if (forecast < 0) {
                outOfMH = true;
                forecast = NaN;
                confidence = NaN;
            };
            // Sentiment: "Bearish, bullish..."
            var sentiment = "";
            if (parseFloat(res.data.Forecast).toFixed(2) >= parseFloat(res.data.DataFrame.Close[res.data.DataFrame.Datetime.length-1]).toFixed(2)) {
                sentiment = "Bullish"
            } else {
                sentiment = "Bearish"
            }
            // Mutation
            console.log('Technical', outOfMH, forecast, sentiment, confidence)
            commit('UPDATE_CANDLESTICK', {csData:csData, lcData:lineData, outOfMH: outOfMH, forecast:forecast, sentiment:sentiment, confidence:confidence})
        })
        .catch(error => {
            console.log(error)
        })
}

export async function fetchSentimentForecast ({ commit }, { ticker }) {
    axios.get(`https://stockprice-forecasting.herokuapp.com/sentiment_forecast/?ticker=${ticker}`)
        .then(res => {
            console.log(res)
            // {
            //     DataFrame: {
            //         Sentiment: ['bullish', 'bearish', 'neutral'],
            //         Tweet: ["tweet data"]
            //     },
            //     Forecast: "Overall forecast",
            //     ForecastConfidence: 0.8,
            //     Ticker: "AAPL"
            //     }
            var formatData = []
            for (let i = 0; i < res.data.DataFrame.Sentiment.length; i++) {
                const el = {
                    sentiment: res.data.DataFrame.Sentiment[i],
                    tweet: res.data.DataFrame.Tweet[i]
                }
                formatData.push(el);
            }
            console.log(formatData);
            // Sentiment & Confidence
            var sentiment = res.data.Forecast;
            var confidence = res.data.ForecastConfidence;
            // Mutation
            console.log('Sentiment', sentiment, confidence)
            commit('UPDATE_SENTIMENT', {saData:formatData, sentiment:sentiment, confidence:confidence})
        })
        .catch(error => {
            console.log(error)
        })
}