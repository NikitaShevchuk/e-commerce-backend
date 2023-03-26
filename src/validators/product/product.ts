import { body } from "express-validator";

const validationErrors = {
    title: "Title must contain only alphanumeric characters and must be of length from 3 to 255",
    image: "Image link must be a valid URL",
    price: "Price can only contain numeric characters.",
    description:
        "Description must contain only alphanumeric characters and must be of length from 5s to 1000",
    sizes: "Sizes filed must be an array of valid sizes",
    favorite: "isFavorite field must be of boolean type",
    new: "productIsNew field must be of boolean type",
    color: "Color field must be of length from 1 to 100"
};

export const productValidators = [
    body("title", validationErrors.title).trim().isString().isLength({ min: 3, max: 255 }),
    body("image", validationErrors.image).trim().isURL(),
    body("price", validationErrors.price).trim().isFloat(),
    body("description", validationErrors.description)
        .trim()
        .isLength({ min: 5, max: 1000 })
        .isString(),
    body("sizes", validationErrors.sizes).isArray(),
    body("isFavorite", validationErrors.favorite).isBoolean(),
    body("productIsNew", validationErrors.new).isBoolean(),
    body("color", validationErrors.title).trim().isString().isLength({ min: 3, max: 100 })
];
