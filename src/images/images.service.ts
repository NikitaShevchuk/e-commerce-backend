import type { DefaultResponse } from "./../Types/Response";
class ImagesService {
    async uploadProductImage(
        image: Express.Multer.File | undefined
    ): Promise<DefaultResponse<{ imageUrl: string }>> {
        if (image === undefined) {
            return {
                success: false,
                message: "Product image is not valid."
            };
        }
        return {
            success: true,
            data: { imageUrl: `/product/image/${image.filename}` }
        };
    }
}

export default new ImagesService();
