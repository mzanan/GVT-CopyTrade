const { http_request } = require("../../Api/config");

export const getBalance = async () => {
  const endpoint = "/contract/v3/private/copytrading/wallet/balance";

  const response = await http_request(
    endpoint,
    "GET",
    "",
    "Getting Balance..."
  );

  const balance = response.data.availableBalance;

  return balance;
};
