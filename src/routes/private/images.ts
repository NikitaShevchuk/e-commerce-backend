import express from "express";
import ImagesController from "../../controllers/images/images.controller";
import { imageUploadErrorHandler } from "../../middleware/image-error";
import CustomStorage from "../../storage/CustomStorage";

const fields = {
    productImage: {
        name: "productImage",
        path: "images/product"
    },
    categoryImage: {
        name: "categoryImage",
        path: "images/category"
    }
};
CustomStorage.addFields([fields.productImage, fields.categoryImage]);

const imagesRoute = express.Router();

imagesRoute.post(
    "/product",
    CustomStorage.upload.single(fields.productImage.name),
    imageUploadErrorHandler,
    ImagesController.uploadProductImage
);
imagesRoute.post(
    "/category",
    CustomStorage.upload.single(fields.categoryImage.name),
    imageUploadErrorHandler,
    ImagesController.uploadCategoryImage
);

export default imagesRoute;
