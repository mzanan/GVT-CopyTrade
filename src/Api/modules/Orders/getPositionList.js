import { http_request } from "../../config";

export const getPositionList = async (symbol) => {
  const endpoint = "/contract/v3/private/copytrading/position/list";

  const data = `symbol=${symbol}`;

  const response = await http_request(endpoint, "GET", data, "Getting Orders");

  return response;
};
