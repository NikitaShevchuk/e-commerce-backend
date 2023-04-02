import type { DiskStorageOptions } from "multer";
import fs from "fs";
import path from "path";
import { ImageUploadError } from "./ImageUploadError";

export interface FileField {
    name: string;
    path: string;
}

export class StorageOptions {
    private fields: FileField[];

    constructor() {
        this.fields = [];
    }

    PUBLIC_PATH = path.join(__dirname, "..", "..", "..", "public");

    public addFields(fields: FileField[]): void {
        this.fields = [...this.fields, ...fields];
    }

    get getFields(): FileField[] {
        return this.fields;
    }

    readonly filename: DiskStorageOptions["filename"] = (request, file, callback) => {
        callback(null, `${new Date().toISOString()}-${file.originalname}`);
    };

    readonly destination: DiskStorageOptions["destination"] = (request, file, callback) => {
        let fileFieldNameIsValid = false;
        this.fields.forEach((field) => {
            if (file.fieldname === field.name) {
                fileFieldNameIsValid = true;
                callback(null, this.createPath(field.path));
            }
        });
        if (!fileFieldNameIsValid) {
            const errorMessage = `Invalid file field name ${file.fieldname}`;
            const error = new ImageUploadError(errorMessage);
            callback(error, this.PUBLIC_PATH + "/unknown");
        }
    };

    private createPath(directory: string): string {
        const filePath = path.join(this.PUBLIC_PATH, directory);
        fs.mkdirSync(filePath, { recursive: true });
        return filePath;
    }
}
