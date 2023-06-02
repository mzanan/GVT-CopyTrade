import { toast } from "react-toastify";

import { executeOrder } from "../../modules/Orders/executeOrder";
import { cancelOrder } from "../../modules/Orders/cancelOrder";

const handleToast = (response) => {
  for (const message of Object.values(response)) {
    toast(`${message.description}: ${message.status}`);
  }
};

const handleOpenOrder = async (side, symbol, tenPercent) => {
  try {
    const response = await executeOrder(side, symbol, tenPercent);

    handleToast(response);
  } catch (error) {
    toast(error);
  }
};

const handleCanelOrder = async (symbol) => {
  try {
    /* const response =  */
    await cancelOrder(symbol);

    /* handleToast(response); */
  } catch (error) {
    toast(error);
  }
};

module.exports = {
  handleToast,
  handleOpenOrder,
  handleCanelOrder,
};
