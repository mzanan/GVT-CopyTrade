import { useState } from "react";
import orderService from "../../services/OrderService";
import Constants from "../../utils/constants";
import { toast } from "react-toastify";

const useSymbolButtons = ({ symbol, tenPercent }) => {
  const [sidePosition, setSidePosition] = useState(null);

  return {
    sidePosition,
    onLong: async () => {
      await orderService.executeOrder(Constants.ORDER_LONG, symbol, tenPercent);

      setSidePosition(Constants.ORDER_LONG);

      toast(`Long open: ${symbol} ${tenPercent}`);
    },

    onShort: async () => {
      await orderService.executeOrder(
        Constants.ORDER_SHORT,
        symbol,
        tenPercent
      );

      setSidePosition(Constants.ORDER_SHORT);

      toast(`Short open: ${symbol} ${tenPercent}`);
    },

    onCancel: () => orderService.cancelOrder(sidePosition, symbol),
  };
};

export default useSymbolButtons;
