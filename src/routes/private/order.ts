import express from "express";
import OrderController from "../../controllers/order/order.controller";
import { idParamValidator } from "../../validators/id";
import { validationErrorHandler } from "../../middleware/validator";
import InvoiceController from "../../controllers/order/invoice/invoice.controller";

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
orderRoute.post("/invoice/:id", [idParamValidator], validationErrorHandler);

export default orderRoute;
