import React from "react";
import "./symbolButtons.css";
import { Button, ToastContainer } from ".";
import useSymbolButtons from "./useSymbolButtons";

const SymbolButtons = ({ symbol, tenPercent }) => {
  const presenter = useSymbolButtons({symbol, tenPercent})

  return (
    <div className="app-button-container">
      <p className="app-button-title"> {symbol} </p>

      <Button
        className="app-button-long"
        label="Long"
        onClick={presenter.onLong}
      />

      <Button
        className="app-button-short"
        onClick={presenter.onShort}
        label="SHORT"
      />

      <Button
        className="app-button-cancel"
        onClick={presenter.onCancel}
        label="Cancel"
      />

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default SymbolButtons;
