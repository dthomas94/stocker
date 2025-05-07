import {
  createChart,
  LineSeries,
  type LineData,
  type Time,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

type HistoricalChartProps = {
  data: LineData<Time>[];
};

export default function HistoricalChart({ data }: HistoricalChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data && chartRef.current) {
      const handleResize = () => {
        chart.applyOptions({ width: chartRef.current.clientWidth });

        chart.timeScale().fitContent();
      };
      const chart = createChart(chartRef.current as HTMLDivElement, {
        layout: {
          background: { color: "#fff" },
        },
        width: chartRef.current?.clientWidth,
        height: 300,
        grid: {
          vertLines: { color: "#eee" },
          horzLines: { color: "#eee" },
        },
      });
      chart.timeScale().fitContent();

      const lineSeries = chart.addSeries(LineSeries);
      lineSeries.setData(data);

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);

        chart.remove();
      };
    }
  }, [data]);

  return (
    <div className="border-transparent rounded-lg shadow p-4 bg-white ">
      <p>Stock Price Trend</p>
      <div ref={chartRef} />
    </div>
  );
}
