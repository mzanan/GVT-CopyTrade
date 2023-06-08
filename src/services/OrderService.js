import bybitApi from "../api/api";
import balanceService from "./BalanceService";

class OrderService {
  executeOrder = async (side, symbol, tenPercent) => {
    const qty = await balanceService.setQuantity(tenPercent, symbol);

    const createOrder = await bybitApi.openOrder(side, symbol, qty);
    console.log(createOrder);

    if (Object.keys(createOrder.data).length === 0) {
      return {
        createOrder,
      };
    }

    const listOrder = await bybitApi.listPositions(symbol);
    console.log(listOrder);

    const slTpResponse = await bybitApi.setStopProfit(createOrder, listOrder);
    console.log(slTpResponse);

    return {
      createOrder,
      side,
    };
  };

  cancelOrder = async (side, symbol) => {
    return await bybitApi.cancelPosition(side, symbol);
  };
}

const orderService = new OrderService();

export default orderService;
