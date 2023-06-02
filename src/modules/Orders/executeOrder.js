import { openOrder } from "./openOrder";
import { getOrders } from "./getOrders";
import { setStopProfit } from "./setStopProfit";
import { setQuantity } from "../Balance/setQuantity";

export const executeOrder = async (side, symbol, tenPercent) => {
  const qty = await setQuantity(tenPercent, symbol);

  const { response: createOrder } = await openOrder(side, symbol, qty);
  console.log(createOrder);

  if (Object.keys(createOrder.data).length === 0) {
    return {
      createOrder: {
        status: createOrder.status,
      },
    };
  }

  const listOrder = await getOrders(symbol);
  console.log(listOrder);

  const slTpResponse = await setStopProfit(createOrder, listOrder);
  console.log(slTpResponse);

  return {
    createOrder: {
      description: createOrder.description,
      status: createOrder.status,
    },
    orderId: createOrder.data.orderId,
  };
};
