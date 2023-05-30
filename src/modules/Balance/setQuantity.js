import { getBalance } from "./getBalance";
import { setTenPercent } from "./setTenPercent";
import { getSymbolPrice } from "../Public/getSymbolPrice";

export const setQuantity = async (symbol) => {
  const balance = await getBalance();
  const amount = await setTenPercent(balance);
  const price = await getSymbolPrice(symbol);

  const qty = amount / price;

  const roundedQty = qty.toFixed(8); // eight decimals

  return roundedQty;
};
