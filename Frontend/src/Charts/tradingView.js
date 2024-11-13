import React from "react";
import {
  AdvancedRealTimeChart,
  TechnicalAnalysis,
  MarketOverview,
} from "react-ts-tradingview-widgets";

export default function TradingWidget(props) {
  const symbol = `NASDAQ:${props.symbol}`;

  return (
    <div className="App">
      <div style={{ height: 500 }}>
        <AdvancedRealTimeChart
          symbol={symbol}
          theme="dark"
          locale="en"
          autosize
        />
      </div>

      {/* Uncomment these components as needed */}
      {/* 
      <TechnicalAnalysis
        symbol={symbol}
        theme="dark"
        locale="en"
      />

      <MarketOverview
        locale="en"
        theme="dark"
      />
      */}
    </div>
  );
}

