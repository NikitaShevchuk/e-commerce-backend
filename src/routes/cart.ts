import express from "express";
import CartController from "../cart/cart.controller";

const cartRoute = express.Router();

cartRoute.get("/", CartController.get);
cartRoute.post("/:productId", CartController.addCartItem);
cartRoute.delete("/:productId", CartController.removeOne);

export default cartRoute;
