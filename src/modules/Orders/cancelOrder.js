const { http_request } = require("../../Api/config");

export const cancelOrder = async (symbol, createOrder) => {
  if (!createOrder) {
    return {
      slTpResponse: {
        description: "Canceling order",
        status: "No open order received.",
      },
    };
  }

  const endpoint = "/contract/v3/private/copytrading/order/cancel";

  const data = `symbol=${symbol}`;

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
