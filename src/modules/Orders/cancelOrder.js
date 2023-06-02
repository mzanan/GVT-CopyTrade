const { http_request } = require("../../Api/config");
/* import { orderLinkId } from "./openOrder"; */

export const cancelOrder = async (symbol) => {
  /* if (!createOrder) {
    return {
      slTpResponse: {
        description: "Canceling order",
        status: "No open order received.",
      },
    };
  }
 */

  /* console.log("orderLinkId ", orderLinkId); */

  const endpoint = "/contract/v3/private/copytrading/order/cancel";

  const data = `{
    "symbol": "${symbol}",
  }`;
  /* "orderLinkId": "${orderLinkId}", */

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
