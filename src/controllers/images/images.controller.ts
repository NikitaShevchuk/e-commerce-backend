import type { RequestHandler } from "express";
import ImagesService from "./images.service";

class ImagesController {
    uploadProductImage: RequestHandler = async (request, response, next) => {
        try {
            const result = await ImagesService.uploadProductImage(request.file);
            response.status(result.success ? 200 : 422).json(result);
        } catch (error) {
            next(error);
        }
    };

    uploadCategoryImage: RequestHandler = async (request, response, next) => {
        try {
            const result = await ImagesService.uploadCategoryImage(request.file);
            response.status(result.success ? 200 : 422).json(result);
        } catch (error) {
            next(error);
        }
    };
}

export default new ImagesController();
