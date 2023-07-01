import express from "express";
import AdminProductsController from "../../admin/admin-product.controller";
import { productValidators } from "../../validators/product/product";
import { validationErrorHandler } from "../../middleware/validator";
import { idParamValidator } from "../../validators/id";
import { titleQueryValidator } from "../../validators/product/title";
import { categoryValidators } from "../../validators/category/category";
import CategoryController from "../../controllers/category/category.controller";

const adminRoute = express.Router();

adminRoute.get("/product", AdminProductsController.getAll);
adminRoute.get(
    "/product/:id",
    [idParamValidator],
    validationErrorHandler,
    AdminProductsController.getById
);
adminRoute.get(
    "/product/search",
    [titleQueryValidator],
    validationErrorHandler,
    AdminProductsController.getById
);
adminRoute.post(
    "/product",
    productValidators,
    validationErrorHandler,
    AdminProductsController.create
);
adminRoute.patch(
    "/product/:id",
    [idParamValidator, ...productValidators],
    validationErrorHandler,
    AdminProductsController.update
);
adminRoute.delete(
    "/product/:id",
    [idParamValidator],
    validationErrorHandler,
    AdminProductsController.delete
);

adminRoute.post("/category", categoryValidators, validationErrorHandler, CategoryController.create);

export default adminRoute;
