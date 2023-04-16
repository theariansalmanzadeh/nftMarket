import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { coinChartColor, CoinPricesMaker } from "../web3/utils";
import { web3Actions } from "../store";
import styles from "../styles/navbar.module.scss";

function CoinPrices() {
  const dispatch = useDispatch();
  const coinPrices = useSelector((state) => state.web3.coinPrices);
  const pricePromise = useSelector((state) => state.web3.getPriceStatus);

  useEffect(() => {
    (async () => {
      try {
        const coinPrices = await Promise.all([
          fetch(
            "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1"
          ),
          fetch(
            "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1"
          ),
          fetch(
            "https://api.coingecko.com/api/v3/coins/tether/market_chart?vs_currency=usd&days=1"
          ),
        ]);

        coinPrices.forEach(async (coin, indx) => {
          const data = await coin.json();

          // dataPrices[indx] = data;
          dispatch(web3Actions.getCoinPrices({ data: data, index: indx }));
          // dispatch(web3Actions.setStatusPrices("rejected"));
        });
      } catch (e) {
        dispatch(web3Actions.setStatusPrices("rejected"));
      }
    })();
  }, [dispatch]);

  if (coinPrices.BTC[0] === 0 || pricePromise === "rejected")
    return (
      <div className={`${styles.Prices}`}>
        <div className={styles.Noprice}>- $ BTC</div>
        <div className={styles.Noprice}>- $ ETH</div>
        <div className={styles.Noprice}>- $ USDT</div>
      </div>
    );

  if (coinPrices.BTC[0] !== 0)
    return (
      <div className={styles.Prices}>
        <div
          className={`${
            styles[coinChartColor(coinPrices.BTC.at(1), coinPrices.BTC.at(-1))]
          }`}
        >
          {CoinPricesMaker(coinPrices.BTC.at(-1))}$ BTC
        </div>
        <div
          className={`${
            styles[coinChartColor(coinPrices.ETH.at(1), coinPrices.ETH.at(-1))]
          }`}
        >
          {CoinPricesMaker(coinPrices.ETH.at(-1))}$ ETH
        </div>
        <div
          className={`${
            styles[coinChartColor(coinPrices.THT.at(1), coinPrices.THT.at(-1))]
          }`}
        >
          {CoinPricesMaker(coinPrices.THT.at(-1))}$ USDT
        </div>
      </div>
    );
}

export default CoinPrices;
