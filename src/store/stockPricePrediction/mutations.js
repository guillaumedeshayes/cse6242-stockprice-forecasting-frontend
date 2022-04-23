export function UPDATE_CANDLESTICK (state, {csData, lcData, outOfMH, forecast, sentiment, confidence}) {
    state.outOfMarketHours = outOfMH;
    state.technicalAnalysisSentiment = sentiment;
    state.technicalAnalysisForecast = forecast;
    state.technicalAnalysisConfidence = confidence;
    if (outOfMH == false) {
      state.candleStickData = [{
        name: "Forecast",
        type: "line",
        data: lcData,
      },
      {
        name: "Candles",
        type: "candlestick",
        data: csData,
      }];  
    } else {
      state.candleStickData = [
      {
        name: "Candles",
        type: "candlestick",
        data: csData,
      }];
    }
    
}

export function UPDATE_SENTIMENT (state, {saData, sentiment, confidence}) {
    state.marketSentimentData = saData
    if (state.outOfMarketHours == false) {
      state.marketSentiment = sentiment;
      state.marketSentimentConfidence = confidence;
    } else {
      state.marketSentiment = sentiment;
      state.marketSentimentConfidence = NaN;
    }
    state.marketSentimentData = saData
}