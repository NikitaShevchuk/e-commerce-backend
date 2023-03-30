import express from "express";
import CartController from "../../cart/cart.controller";
import { validationErrorHandler } from "../../middleware/validator";
import { idParamValidator } from "../../validators/id";

const cartRoute = express.Router();

cartRoute.get("/", CartController.get);
cartRoute.post("/:id", [idParamValidator], validationErrorHandler, CartController.addCartItem);
cartRoute.delete("/", CartController.removeAll);
cartRoute.delete("/:id", [idParamValidator], validationErrorHandler, CartController.removeOne);

export default cartRoute;
