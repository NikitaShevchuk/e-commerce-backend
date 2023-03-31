import express from "express";
import ImagesController from "../../images/images.controller";

const productsImagesRoute = express.Router();

productsImagesRoute.post("/", ImagesController.uploadProductImage);

export default productsImagesRoute;
