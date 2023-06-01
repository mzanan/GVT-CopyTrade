const { http_request } = require("../../Api/config");

export const getOrders = async (symbol) => {
  const endpoint = "/contract/v3/private/copytrading/position/list";

  const data = `symbol=${symbol}`;

  const response = await http_request(endpoint, "GET", data, "Getting Orders");

  return response;
};
