import HistoricalChart from "../components/charts/historical";
import { data, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Form, useSubmit } from "react-router";
import Select from "react-select";
import { Heading } from "@radix-ui/themes/components/heading";
import { Flex } from "@radix-ui/themes/components/flex";
import { getTickerAggregate, getTickers } from "~/utils/api";
import type { LineData, Time } from "lightweight-charts";
import type { SelectOption } from "~/utils/types";

const DEFAULT_TICKER = "A";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const selectedTicker = {
    ticker: url.searchParams.get("ticker")?.toUpperCase() ?? DEFAULT_TICKER,
    name: "",
  };

  let allTickers: SelectOption[] = [];
  let tickerAggs: LineData<Time>[] = [];

  try {
    const res = await getTickers();
    if (res) {
      allTickers = res.map(({ ticker, name }) => {
        if (ticker === selectedTicker.ticker) {
          selectedTicker.name = name;
        }
        return {
          label: ticker,
          value: name,
        };
      });
    }
  } catch (err) {
    console.log("Uh oh", err);
  }

  try {
    const res = await getTickerAggregate(
      selectedTicker.ticker,
      1,
      "day",
      "2025-01-09",
      "2025-05-12"
    );
    if (res) {
      tickerAggs = res.map(({ t, c }) => ({
        time: t as Time,
        value: c ?? 0,
      }));
    }
  } catch (err) {
    console.log(err);
    throw data("Help", { status: 404 });
  }

  return { data: { tickerAggs, allTickers, selectedTicker } };
}

export default function Dashboard() {
  const {
    data: { tickerAggs, allTickers, selectedTicker },
  } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  return (
    <main className="flex-1 p-8">
      <Flex direction="column" className="max-w-10/12 min-w-110">
        <Form
          className="flex justify-between rounded-t-xl content-center mb-6"
          id="ticker-form"
          onChange={(e) => submit(e.currentTarget)}
        >
          <Heading
            as={"h3"}
            className="flex-1 font-bold content-center text-2xl"
          >
            {selectedTicker.name}
          </Heading>
          <Select
            name="ticker"
            styles={{
              indicatorSeparator: (baseStyles) => ({
                ...baseStyles,
                visibility: "hidden",
              }),
            }}
            defaultValue={{
              label: selectedTicker.ticker,
              value: selectedTicker.name,
            }}
            options={allTickers}
            className="z-10 font-bold"
            onChange={(v) => {
              if (v?.value) {
                submit({ ticker: v.label });
              }
            }}
          />
        </Form>
        <HistoricalChart data={tickerAggs} />
      </Flex>
    </main>
  );
}
