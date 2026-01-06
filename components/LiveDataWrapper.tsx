"use client";
import { Separator } from "@radix-ui/react-separator";
import CandlestickChart from "./CandleStickChart";

const LiveDataWrapper = ({
  coinId,

  coinOHLCData,
}: LiveDataProps) => {
  return (
    <section id="live-data-wrapper">
      <p>Coin Header</p>
      <Separator className="divider" />
      <div className="trend">
        <CandlestickChart coinId={coinId} data={coinOHLCData}>
          <h4>Trend Overview</h4>
        </CandlestickChart>
      </div>
    </section>
  );
};

export default LiveDataWrapper;
