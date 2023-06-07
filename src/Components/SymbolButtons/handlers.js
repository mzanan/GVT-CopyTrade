import { toast } from "react-toastify";

import { executeOrder } from "../../Api/modules/Orders/executeOrder";
import { cancelPosition } from "../../Api/modules/Orders/cancelPosition";

export const handleToast = (response) => {
  for (const message of Object.values(response)) {
    toast(`${message.description}: ${message.status}`);
  }
};

export const handleOpenOrder = async (side, symbol, tenPercent) => {
  try {
    const response = await executeOrder(side, symbol, tenPercent);

    handleToast(response);
  } catch (error) {
    toast(error);
  }
};

export const handleCanelOrder = async (side, symbol) => {
  try {
    /* const response =  */
    await cancelPosition(side, symbol);

    /* handleToast(response); */
  } catch (error) {
    toast(error);
  }
};
