import express from "express";
import ShopController from "../../shop/shop.controller";
import { validationErrorHandler } from "../../middleware/validator";
import { idParamValidator } from "../../validators/id";

const shopRoute = express.Router();

shopRoute.get("/", ShopController.getAll);
shopRoute.get("/:id", [idParamValidator], validationErrorHandler, ShopController.getById);

export default shopRoute;
