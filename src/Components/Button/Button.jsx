import React from "react";
import "./button.css";

const Button = ({ className, label, action }) => (
  <button className={`app-button ${className}`} onClick={action}>
    {label}
  </button>
);

export default Button;
