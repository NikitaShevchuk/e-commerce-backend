import multer, { type Multer, type Options, type StorageEngine } from "multer";
import { StorageOptions } from "./StorageOptions";

class CustomStorage extends StorageOptions {
    private readonly storage: StorageEngine;
    public readonly upload: Multer;

    constructor() {
        super();
        this.storage = multer.diskStorage({
            destination: this.destination,
            filename: this.filename
        });
        this.upload = multer({ storage: this.storage, fileFilter: this.fileFilter });
    }

    private allowedFileTypes: string[] = ["image/jpeg", "image/png", "image/jpg"];

    public addAllowedFileTypes(fileTypes: string[]): void {
        this.allowedFileTypes = [...this.allowedFileTypes, ...fileTypes];
    }

    private readonly fileFilter: Options["fileFilter"] = (request, file, callback) => {
        const fileTypeIsValid = this.allowedFileTypes.find((type) => type === file.mimetype);
        if (fileTypeIsValid !== undefined) callback(null, true);
        else callback(null, false);
    };
}

export default new CustomStorage();
