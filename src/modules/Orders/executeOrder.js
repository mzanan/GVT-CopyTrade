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

  return [
    { description: createOrder.description, status: createOrder.data.retMsg },
    { description: listOrder.description, status: listOrder.data.retMsg },
    { description: slTpResponse.description, status: slTpResponse.data.retMsg },
  ];
};
