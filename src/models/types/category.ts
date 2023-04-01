import type { Types } from "mongoose";
import type { Sizes } from "./product";

export enum ColorsEnum {
    black = "black",
    white = "white",
    blue = "blue",
    red = "red"
}

export interface ICategory extends Document {
    _id: number;
    title: string;
    description: string;
    sizes: Sizes[];
    colors: ColorsEnum[];
    image: string;
    userId: Types.ObjectId | undefined | string;
}
