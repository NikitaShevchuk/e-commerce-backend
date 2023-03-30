import express from "express";
import OrderController from "../../order/order.controller";
import { idParamValidator } from "../../validators/id";
import { validationErrorHandler } from "../../middleware/validator";

const orderRoute = express.Router();

orderRoute.get("/", OrderController.get);
orderRoute.post("/", OrderController.create);
orderRoute.delete("/:id", [idParamValidator], validationErrorHandler, OrderController.removeOne);

export default orderRoute;
