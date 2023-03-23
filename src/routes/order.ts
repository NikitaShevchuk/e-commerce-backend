import express from "express";
import OrderController from "../order/order.controller";

const orderRoute = express.Router();

orderRoute.get("/", OrderController.get);
orderRoute.post("/", OrderController.create);
orderRoute.delete("/:orderId", OrderController.removeOne);

export default orderRoute;
