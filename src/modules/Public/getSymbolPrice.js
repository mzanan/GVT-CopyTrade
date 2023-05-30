const { http_request } = require("../../Api/config");

export const getSymbolPrice = async (symbol) => {
  const endpoint = "/derivatives/v3/public/tickers";

  const data = `symbol=${symbol}`;

  const response = await http_request(
    endpoint,
    "GET",
    data,
    "Getting Symbol Price..."
  );

  const price = response.data.list[0].lastPrice;

  return price;
};
