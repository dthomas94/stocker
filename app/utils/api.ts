import { restClient, type IAggs, type ITickers } from "@polygon.io/client-js";
const rest = restClient(import.meta.env.VITE_POLY_API_KEY);

export async function getTickers(): Promise<ITickers["results"] | []> {
  try {
    const res = await rest.reference.tickers({ market: "stocks", limit: 100 });
    return res?.results ?? [];
  } catch (err) {
    console.error("Uh-oh", err);
    return [];
  }
}

/**
 * Retrieve aggregated historical OHLC (Open, High, Low, Close) and volume data for a specified stock ticker over a custom date range and time interval in Eastern Time (ET)
 * @param ticker - Specify a case-sensitive ticker symbol. For example, AAPL represents Apple Inc.
 * @param multiplier - The size of the timespan multiplier.
 * @param timespan - The size of the time window.
 * @param from - The start of the aggregate time window. Either a date with the format YYYY-MM-DD or a millisecond timestamp.
 * @param to - The end of the aggregate time window. Either a date with the format YYYY-MM-DD or a millisecond timestamp.
 * @returns An array of results containing the requested data.
 */
export async function getTickerAggregate(
  ticker: string,
  multiplier: number,
  timespan: string,
  from: string,
  to: string
): Promise<IAggs["results"] | []> {
  try {
    const res = await rest.stocks.aggregates(
      ticker,
      multiplier,
      timespan,
      from,
      to,
      {
        sort: "asc",
      }
    );
    return res?.results ?? [];
  } catch (err) {
    console.error("Uh-oh", err);
    return [];
  }
}
