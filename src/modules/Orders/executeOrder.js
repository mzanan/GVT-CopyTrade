import { openOrder } from "./openOrder";
import { getOrder } from "./getOrder";
import { setStopProfit } from "./setStopProfit";

export const executeOrder = async (side, symbol) => {
  const createOrder = await openOrder(side, symbol);
  console.log(createOrder);

  if (Object.keys(createOrder.data).length === 0) {
    return {
      createOrder: {
        status: createOrder.status,
      },
    };
  } else if (createOrder.data) {
    return {
      createOrder: {
        description: createOrder.description,
        status: createOrder.status,
      },
    };
  }

  const listOrder = await getOrder(symbol);
  console.log(listOrder);

  if (listOrder) {
    return {
      listOrder: {
        description: listOrder.description,
        status: listOrder.status,
      },
    };
  }

  const slTpResponse = await setStopProfit(createOrder, listOrder);
  console.log(slTpResponse);

  if (slTpResponse) {
    return {
      slTpResponse: {
        description: slTpResponse.description,
        status: slTpResponse.status,
      },
    };
  }
};
