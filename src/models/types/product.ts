import type { Types } from "mongoose";

export enum Sizes {
    XS = "XS",
    S = "S",
    M = "M",
    L = "L",
    XL = "XL"
}

export interface IProduct extends Document {
    _id: number;
    title: string;
    price: number;
    description: string;
    sizes: Sizes[];
    isFavorite: boolean;
    productIsNew: boolean;
    image: string;
    color: string;
    userId: Types.ObjectId | undefined | string;
}
