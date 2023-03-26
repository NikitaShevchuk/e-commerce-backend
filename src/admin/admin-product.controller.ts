import type { Response, Request } from "express";
import AdminProductService from "./admin-product.service";
import { validationResult } from "express-validator";
import { createValidationErrorResponse } from "../validators/validation-error";

class AdminProductsController {
    async create(request: Request, response: Response): Promise<void> {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(422).json(createValidationErrorResponse(errors));
            return;
        }
        const product = await AdminProductService.create(request.body, request.session?.user?._id);
        response.status(201).json(product);
    }

    async getAll(request: Request, response: Response): Promise<void> {
        const product = await AdminProductService.getAll(request.session?.user?._id);
        response.status(200).json(product);
    }

    async getById(request: Request, response: Response): Promise<void> {
        const product = await AdminProductService.getById(
            request.params.id,
            request.session?.user?._id
        );
        response.status(200).json(product);
    }

    async getByTitle(request: Request, response: Response): Promise<void> {
        const product = await AdminProductService.getByTitle(
            request.params.title,
            request.session?.user?._id
        );
        response.status(200).json(product);
    }

    async update(request: Request, response: Response): Promise<void> {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(422).json(createValidationErrorResponse(errors));
            return;
        }
        const product = await AdminProductService.update(
            request.params.id,
            request.body,
            request.session?.user?._id
        );
        response.status(200).json(product);
    }

    async delete(request: Request, response: Response): Promise<void> {
        if (typeof request.params?.id === "string") {
            const product = await AdminProductService.delete(
                request.params.id,
                request.session?.user?._id
            );
            response.status(200).json(product);
        }
    }
}

export default new AdminProductsController();
