const { http_request } = require("../Api/config");

export const getBalance = async () => {
  const endpoint = "/contract/v3/private/copytrading/wallet/balance";

  const response = await http_request(
    endpoint,
    "GET",
    "",
    "Getting Balance..."
  );

  console.log(response);

  const balance = Number(response.data.availableBalance);
  const tenPercent = Number((balance * 0.1).toFixed(2));

  console.log(balance, tenPercent);
  return response;
};
