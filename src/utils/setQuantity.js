import { getBalance } from "../Api/modules/Balance/getBalance";
import { setTenPercent } from "./setTenPercent";
import { getSymbolPrice } from "../Api/modules/Public/getSymbolPrice";

export const tenPercentBalance = async () => {
  const balance = await getBalance();
  const tenPercent = await setTenPercent(balance);

  return tenPercent;
};

export const setQuantity = async (tenPercent, symbol) => {
  const price = await getSymbolPrice(symbol);

  const qty = (tenPercent / price).toFixed(8); // eight decimals
  console.log({ tenPercent, symbol, price, qty });

  return qty;
};
