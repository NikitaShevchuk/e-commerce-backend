import express from "express";
import AdminProductsController from "../admin/admin-product.controller";
import { productValidators } from "../validators/product/product";

const adminRoute = express.Router();

adminRoute.get("/product", AdminProductsController.getAll);
adminRoute.get("/product/:id", AdminProductsController.getById);
adminRoute.post("/product", productValidators, AdminProductsController.create);
adminRoute.patch("/product/:id", productValidators, AdminProductsController.update);
adminRoute.delete("/product/:id", AdminProductsController.delete);

export default adminRoute;
