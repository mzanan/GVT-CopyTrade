import React from "react";

import Button from "../Button/Button";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { handleOpenOrder, handleCanelOrder } from "./handlers";

module.exports = {
  React,
  Button,
  ToastContainer,
  handleOpenOrder,
  handleCanelOrder,
};
