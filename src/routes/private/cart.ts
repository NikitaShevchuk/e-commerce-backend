import express from "express";
import CartController from "../../cart/cart.controller";
import { validationErrorHandler } from "../../middleware/validator";
import { idParamValidator } from "../../validators/id";
import { cartBodyValidator, cartSizeParamsValidator } from "../../validators/cart";

const cartRoute = express.Router();

cartRoute.get("/", CartController.get);
cartRoute.post("/", cartBodyValidator, validationErrorHandler, CartController.addCartItem);
cartRoute.delete("/", CartController.removeAll);
cartRoute.delete(
    "/:id/:size",
    [idParamValidator, cartSizeParamsValidator],
    validationErrorHandler,
    CartController.removeOne
);

export default cartRoute;
