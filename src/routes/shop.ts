import express from "express";
import ShopController from "../shop/shop.controller";

const shopRoute = express.Router();

shopRoute.get("/", ShopController.getAll);
shopRoute.get("/:id", ShopController.getById);

export default shopRoute;
