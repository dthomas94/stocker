import HistoricalChart from "../components/charts/HistoricalChart";
import {
  data,
  useFetcher,
  useLoaderData,
  type ClientActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { Form, useSubmit } from "react-router";
import Select from "react-select";
import { Heading } from "@radix-ui/themes/components/heading";
import { Flex } from "@radix-ui/themes/components/flex";
import { getTickerAggregate } from "@api/ticker";
import type { LineData, Time } from "lightweight-charts";
import { format, subDays } from "date-fns";

const DEFAULT_TICKER = "A";
const DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
const TODAY = format(new Date(), DEFAULT_DATE_FORMAT);
const DEFAULT_TO = TODAY;
const DEFAULT_FROM = format(subDays(DEFAULT_TO, 30), DEFAULT_DATE_FORMAT);

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const selectedTicker = {
    ticker: url.searchParams.get("ticker")?.toUpperCase() ?? DEFAULT_TICKER,
    name: "",
  };
  const from = url.searchParams.get("from") ?? DEFAULT_FROM;
  const to = url.searchParams.get("to") ?? DEFAULT_TO;

  let tickerAggs: LineData<Time>[] = [];

  try {
    const res = await getTickerAggregate(
      selectedTicker.ticker,
      1,
      "day",
      from,
      to
    );
    if (res) {
      tickerAggs = res.map(({ t, c }) => {
        const time = format(new Date(t as EpochTimeStamp), "yyyy-MM-dd");
        return {
          time,
          value: c ?? 0,
        };
      });
    }
  } catch (err) {
    console.log(err);
    throw data("Help", { status: 404 });
  }

  return { data: { tickerAggs, selectedTicker } };
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  await new Promise((res) => setTimeout(res, 1000));
  let data = await request.formData();

  let title = data.get("title") as string;
  if (title.trim() === "") {
    return { ok: false, error: "Title cannot be empty" };
  }

  localStorage.setItem("title", title);
  return { ok: true, error: null };
}

export default function Dashboard() {
  const {
    data: { tickerAggs, selectedTicker },
  } = useLoaderData<typeof loader>();

  const submit = useSubmit();
  const fetcher = useFetcher<typeof loader>();

  return (
    <main className="flex-1 p-8">
      <Flex direction="column" className="max-w-10/12 min-w-110">
        <fetcher.Form method="get">
          <input
            name="q"
            type="text"
            placeholder="APPL"
            onChange={(e) => fetcher.submit(e.currentTarget.form)}
          />
        </fetcher.Form>
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
            isSearchable={false}
            options={[]}
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
