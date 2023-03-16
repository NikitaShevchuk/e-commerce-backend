import express from "express";
import AdminProductsController from "../admin/admin-product.controller";

const adminRoute = express.Router();

adminRoute.get("/product", AdminProductsController.getAll);
adminRoute.get("/product/:id", AdminProductsController.getById);
adminRoute.post("/product", AdminProductsController.create);
adminRoute.patch("/product/:id", AdminProductsController.update);

export default adminRoute;
