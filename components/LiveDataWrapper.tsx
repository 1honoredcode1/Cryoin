"use client";

import { Separator } from "@radix-ui/react-separator";
import CandlestickChart from "./CandleStickChart";
import CoinHeader from "./CoinHeader";

export default function LiveDataWrapper({
  coinId,
  coin,
  coinOHLCData,
}: LiveDataProps) {
  return (
    <section id="live-data-wrapper">
      <CoinHeader
        name={coin.name}
        image={coin.image.large}
        livePrice={coin.market_data.current_price.usd}
        livePriceChangePercentage24h={
          coin.market_data.price_change_percentage_24h_in_currency.usd
        }
        priceChangePercentage30d={
          coin.market_data.price_change_percentage_30d_in_currency.usd
        }
        priceChange24h={coin.market_data.price_change_24h_in_currency.usd}
      />

      <Separator className="divider" />

      <div className="trend">
        <CandlestickChart coinId={coinId} data={coinOHLCData ?? []}>
          <h4>Trend Overview</h4>
        </CandlestickChart>
      </div>
    </section>
  );
}
