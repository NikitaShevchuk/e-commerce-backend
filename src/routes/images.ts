import express from "express";
import ImagesController from "../images/images.controller";

const imagesRoute = express.Router();

imagesRoute.post("/", ImagesController.uploadProductImage);

export default imagesRoute;
