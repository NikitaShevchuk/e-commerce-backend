import { type HydratedDocument } from "mongoose";
import Product, { type IProduct } from "../../models/Product";

interface NewOrder {
    product: HydratedDocument<IProduct> | null;
    quantity: number;
}

export interface NewOrderRequestData {
    productId: string;
    quantity: number;
}

interface ReturnType {
    productsFromDatabase: NewOrder[];
    allProductsAreValid: boolean;
}

export const getProductsFromDatabase = async (
    products: NewOrderRequestData[]
): Promise<ReturnType> => {
    let allProductsAreValid = true;

    const productsFromDatabase = await Promise.all(
        products.map(async ({ productId, quantity }) => {
            const productInDatabase = allProductsAreValid
                ? await Product.findById(productId)
                : null;
            if (productInDatabase === null || typeof quantity !== "number") {
                allProductsAreValid = false;
            }
            return { product: productInDatabase, quantity };
        })
    );

    return {
        productsFromDatabase,
        allProductsAreValid
    };
};
