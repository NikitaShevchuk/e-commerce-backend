export class ImageUploadError extends Error {
    readonly imageError: string;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ImageUploadError.prototype);
        this.imageError = message;
    }
}
