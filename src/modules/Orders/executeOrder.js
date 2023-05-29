import { openOrder } from "./openOrder";
import { getOrder } from "./getOrder";
import { setStopProfit } from "./setStopProfit";

export const executeOrder = async (side, symbol) => {
  const createOrder = await openOrder(side, symbol);
  console.log(createOrder);

  const listOrder = await getOrder(symbol);
  console.log(listOrder);

  const slTpResponse = await setStopProfit(createOrder, listOrder);
  console.log(slTpResponse);

  return {
    createOrder: {
      description: createOrder.description,
      status: createOrder.status,
    },
    listOrder: {
      description: listOrder.description,
      status: listOrder.status,
    },
    slTpResponse: {
      description: slTpResponse.description,
      status: slTpResponse.status,
    },
  };
};
