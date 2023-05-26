const { http_request } = require("../../Api/config");

export const cancelOrder = async (symbol, orderLinkId) => {
  const endpoint = "/contract/v3/private/copytrading/order/trading-stop";

  const data = `{
    "symbol": "${symbol}"
  }`;

  console.log(data);

  const response = await http_request(
    endpoint,
    "POST",
    data,
    "Canceling order"
  );

  console.log(response);

  return response;
};
