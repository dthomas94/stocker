import HistoricalChart from "../components/charts/historical";
import { data, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Form, useSubmit } from "react-router";
import Select from "react-select";
import { Heading } from "@radix-ui/themes/components/heading";
import { Flex } from "@radix-ui/themes/components/flex";

//const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const DEFAULT_SYMBOL = "EFGH";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const selectedSymbol =
    url.searchParams.get("symbol")?.toUpperCase() ?? DEFAULT_SYMBOL;

  const symbolOptions: { value: string; label: string }[] = [];
  let last30Days = [];

  try {
    //const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${params.symbol}&apikey=${API_KEY}`);
    // Data provided does not span the last 30 days, it starts in March
    const response = await fetch("http://localhost:5173/data.json");
    const data = await response.json();
    Object.keys(data).forEach((key) =>
      symbolOptions.push({ value: key, label: key })
    );

    // const timeSeriesData = Object.entries(data["Time Series (Daily)"]) # Use only with alphavantage api
    const timeSeriesData = Object.entries(
      data[selectedSymbol]["Time Series (Daily)"]
    ).map(([time, day]: [string, any]) => ({
      time,
      value: parseFloat(day["4. close"]),
    }));
    // Charting library throws error if data is not sorted asc by timestamp
    timeSeriesData.sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );
    last30Days = timeSeriesData.slice(0, 30);
  } catch (err) {
    console.log(err);
    throw data("Help", { status: 404 });
  }

  return { data: { last30Days, symbolOptions, selectedSymbol } };
}

export default function Home() {
  const {
    data: { last30Days, symbolOptions, selectedSymbol },
  } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  return (
    <main className="flex-1 p-8">
      <Flex direction="column" className="max-w-10/12 min-w-110">
        <Form
          className="flex justify-between rounded-t-xl content-center mb-6"
          id="symbol-form"
          onChange={(e) => submit(e.currentTarget)}
        >
          <Heading
            as={"h3"}
            className="flex-1 font-bold content-center text-2xl"
          >
            {selectedSymbol}
          </Heading>
          <Select
            name="symbol"
            styles={{
              indicatorSeparator: (baseStyles) => ({
                ...baseStyles,
                visibility: "hidden",
              }),
            }}
            defaultValue={{
              value: selectedSymbol,
              label: selectedSymbol,
            }}
            options={symbolOptions}
            className="z-10 font-bold"
            onChange={(v) => {
              if (v?.value) {
                submit({ symbol: v.value });
              }
            }}
          />
        </Form>
        <HistoricalChart data={last30Days} />
      </Flex>
    </main>
  );
}
