import path from "path";
import { APP_BASE_URL } from "./routes/paths";

interface FilePath {
    url: string;
    path: string;
}

export const filesPaths: FilePath[] = [
    {
        url: `${APP_BASE_URL}/api/product/image`,
        path: path.join(__dirname, "..", "..", "public", "images", "product")
    }
];
