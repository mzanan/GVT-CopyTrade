import React from "react";
import "./button.css";

const Button = ({ className, label, ...props }) => (
  <button className={`app-button ${className}`} {...props}>
    {label}
  </button>
);

export default Button;
