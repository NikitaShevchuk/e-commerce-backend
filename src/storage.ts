import multer from "multer";

export const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "public/images/product");
    },
    filename: (request, file, callback) => {
        callback(null, `${new Date().toISOString()}-${file.originalname}`);
    }
});

export const fileFilter: multer.Options["fileFilter"] = (request, file, callback) => {
    const fileTypeIsValid =
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg";
    if (fileTypeIsValid) callback(null, true);
    else callback(null, false);
};
