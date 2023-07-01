import type { DefaultResponse } from "./../../Types/Response";

class ImagesService {
    private readonly invalidImageError: DefaultResponse<undefined>;
    constructor() {
        this.invalidImageError = {
            success: false,
            message: "Image is not valid."
        };
    }

    async uploadProductImage(
        productImage: Express.Multer.File | undefined
    ): Promise<DefaultResponse<{ imageUrl: string } | undefined>> {
        if (productImage === undefined) return this.invalidImageError;
        return {
            success: true,
            data: { imageUrl: `/product/image/${productImage.filename}` }
        };
    }

    async uploadCategoryImage(
        categoryImage: Express.Multer.File | undefined
    ): Promise<DefaultResponse<{ imageUrl: string } | undefined>> {
        if (categoryImage === undefined) return this.invalidImageError;
        return {
            success: true,
            data: { imageUrl: `/category/image/${categoryImage.filename}` }
        };
    }
}

export default new ImagesService();
