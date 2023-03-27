import express from "express";
import AdminProductsController from "../admin/admin-product.controller";
import { productValidators } from "../validators/product/product";
import { validationErrorHandler } from "../middleware/validator";

const adminRoute = express.Router();

adminRoute.get("/product", AdminProductsController.getAll);
adminRoute.get("/product/:id", AdminProductsController.getById);
adminRoute.post(
    "/product",
    productValidators,
    validationErrorHandler,
    AdminProductsController.create
);
adminRoute.patch(
    "/product/:id",
    productValidators,
    validationErrorHandler,
    AdminProductsController.update
);
adminRoute.delete("/product/:id", AdminProductsController.delete);

export default adminRoute;
