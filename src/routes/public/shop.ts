import express from "express";
import ShopController from "../../controllers/shop/shop.controller";
import { validationErrorHandler } from "../../middleware/validator";
import { idParamValidator } from "../../validators/id";
import { titleQueryValidator } from "../../validators/product/title";
import { paginationParamsValidators } from "../../validators/product/pagination";

const shopRoute = express.Router();

shopRoute.get(
    "/",
    [...paginationParamsValidators, titleQueryValidator],
    validationErrorHandler,
    ShopController.getAll
);
shopRoute.get("/:id", [idParamValidator], validationErrorHandler, ShopController.getById);

export default shopRoute;
