export default function () {
  return {
    candleStickData: [{
      name: "Forecast",
      type: "line",
      data: [
        {
          x: new Date(1538778600000),
          y: 6632.15,
        },
        {
          x: new Date(1538884800000),
          y: 6632.15,
        },
      ],
    },
    {
      name: "Candles",
      type: "candlestick",
      data: [
        {
          x: new Date(1538778600000),
          y: [6629.81, 6629.5, 6629.04, 6629.33],
        },
        {
          x: new Date(1538780400000),
          y: [6629.01, 6629.59, 6629, 6629.11],
        },
      ]}],
    marketSentimentData: [{sentiment:"Neutral", tweet:"Loading data"}],
    technicalAnalysisForecast: 0,
    technicalAnalysisSentiment: "",
    marketSentiment: "",
    technicalAnalysisConfidence: 0,
    marketSentimentConfidence: 0,
    outOfMarketHours: false,
  }
}
