const { http_request } = require("../../Api/config");

export const cancelPosition = async (side, symbol) => {
  /* if (!createOrder) {
    return {
      slTpResponse: {
        description: "Canceling position",
        status: "No position received.",
      },
    };
  } */

  const endpoint = "/contract/v3/private/copytrading/position/close";

  let positionIdx = 0;
  if (side === "Buy") {
    positionIdx = 1;
  } else if (side === "Sell") {
    positionIdx = 2;
  }
  //0-Single side; 1-Buy side of both side mode; 2-Sell side of both side mode

  console.log({ side, positionIdx });

  const data = `{
    "symbol": "${symbol}",
    "positionIdx": "${positionIdx}"
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
