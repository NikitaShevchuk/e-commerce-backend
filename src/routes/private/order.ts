import express from "express";
import OrderController from "../../order/order.controller";
import { idParamValidator } from "../../validators/id";
import { validationErrorHandler } from "../../middleware/validator";
import InvoiceController from "../../order/invoice/invoice.controller";

const orderRoute = express.Router();

orderRoute.get("/", OrderController.get);
orderRoute.post("/", OrderController.create);
orderRoute.delete("/:id", [idParamValidator], validationErrorHandler, OrderController.removeOne);

orderRoute.get(
    "/invoice/:id",
    [idParamValidator],
    validationErrorHandler,
    InvoiceController.download
);
orderRoute.post(
    "/invoice/:id",
    [idParamValidator],
    validationErrorHandler,
    InvoiceController.upload
);

export default orderRoute;
