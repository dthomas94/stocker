import {
  ListTickersMarketEnum,
  ListTickersOrderEnum,
  ListTickersSortEnum,
  type ListTickers200Response,
  type ListTickers200ResponseResultsInner,
} from "@massive.com/client-js";
import rest from "@api/base";

async function getTickers(
  search?: string
): Promise<ListTickers200ResponseResultsInner[] | []> {
  try {
    const res = await rest.listTickers(
      undefined,
      undefined,
      ListTickersMarketEnum.Stocks,
      undefined,
      undefined,
      undefined,
      undefined,
      search,
      true,
      undefined,
      undefined,
      undefined,
      undefined,
      ListTickersOrderEnum.Desc,
      100,
      ListTickersSortEnum.Name
    );
    return res.results ?? [];
  } catch (err) {
    console.error("Uh-oh", err);
    return [];
  }
}

export { getTickers };
