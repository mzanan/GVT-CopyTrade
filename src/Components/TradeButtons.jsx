import React from "react";
import { openOrder, getOrder } from "../modules/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TradeButtons = ({ symbol }) => {
  const handleOpenOrder = async (type, symbol) => {
    try {
      const [response, info] = await openOrder(type, symbol);
      toast(info);
      toast(response.retMsg);
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <div className="app-button-container">
      <p className="app-button-title"> {symbol} </p>

      <button
        className="app-button app-button-long"
        onClick={() => handleOpenOrder("Buy", symbol)}
      >
        LONG
      </button>

      <button
        className="app-button app-button-short"
        onClick={() => handleOpenOrder("Sell", symbol)}
      >
        SHORT
      </button>

      <button
        className="app-button app-button-cancel"
        onClick={() => getOrder()}
      >
        Cancel
      </button>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default TradeButtons;
