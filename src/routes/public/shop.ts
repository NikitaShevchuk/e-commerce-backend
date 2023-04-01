import express from "express";
import ShopController from "../../controllers/shop/shop.controller";
import { validationErrorHandler } from "../../middleware/validator";
import { idParamValidator } from "../../validators/id";
import { titleQueryValidator } from "../../validators/product/title";
import { paginationParamsValidators } from "../../validators/product/pagination";
import CategoryController from "../../controllers/category/category.controller";

const shopRoute = express.Router();

shopRoute.get(
    "/product",
    [...paginationParamsValidators, titleQueryValidator],
    validationErrorHandler,
    ShopController.getAll
);
shopRoute.get("/product/:id", [idParamValidator], validationErrorHandler, ShopController.getById);

shopRoute.get(
    "/category",
    [titleQueryValidator],
    validationErrorHandler,
    CategoryController.getAll
);
shopRoute.get(
    "/category/:id",
    [idParamValidator],
    validationErrorHandler,
    CategoryController.getById
);

export default shopRoute;
