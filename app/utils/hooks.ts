import { useQuery } from "@tanstack/react-query";
import { getTickers } from "@api/tickers";

export function useAllTickers() {
  return useQuery({
    queryKey: ["allTickers"],
    queryFn: async () => {
      const data = await getTickers();
      return data.map(({ ticker, name }) => ({
        label: ticker,
        value: name,
      }));
    },
    staleTime: Infinity,
  });
}
