import path from "path";
import { APP_BASE_URL } from "./routes";

interface FilePath {
    url: string;
    path: string;
}

export const filesPaths: FilePath[] = [
    {
        url: `/${APP_BASE_URL}/product/image`,
        path: path.join(__dirname, "..", "..", "public", "images", "product")
    }
];
