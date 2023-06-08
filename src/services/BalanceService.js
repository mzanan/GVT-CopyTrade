import bybitApi from "../api/api";
import { setTenPercent } from "../utils/setTenPercent";

class BalanceService {
  tenPercentBalance = async () => {
    const balance = await bybitApi.getBalance();
    const tenPercent = await setTenPercent(balance);

    return tenPercent;
  };

  setQuantity = async (tenPercent, symbol) => {
    const price = await bybitApi.getPrice(symbol);

    const qty = (tenPercent / price).toFixed(8); // eight decimals
    console.log({ tenPercent, symbol, price, qty });

    return qty;
  };
}

const balanceService = new BalanceService();

export default balanceService;
