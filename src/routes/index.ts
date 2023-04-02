import type { Application } from "express";
import { checkAuthorization } from "../middleware/is-auth";
import shopRoute from "./public/shop";
import { doubleCsrfProtection, csrfErrorHandler } from "../security/csrf";
import { errorHandler } from "../middleware/error";
import adminRoute from "./private/admin";
import cartRoute from "./private/cart";
import orderRoute from "./private/order";
import authRoute from "./public/auth";
import imagesRoute from "./private/images";

export const APP_BASE_URL = "api";

const paths = {
    default: APP_BASE_URL,
    shop: `/${APP_BASE_URL}`,
    admin: `/${APP_BASE_URL}/admin`,
    product: `/${APP_BASE_URL}/product`,
    cart: `/${APP_BASE_URL}/cart`,
    order: `/${APP_BASE_URL}/order`,
    auth: `/${APP_BASE_URL}/auth`,
    images: `/${APP_BASE_URL}/image`
};

export const setupRoutes = (app: Application): void => {
    // Public routes
    app.get(`/${paths.default}`, (_, response) => {
        response.send("The server is up and running!");
    });
    app.use(paths.shop, shopRoute);
    app.use(paths.auth, authRoute);

    // Private routes
    app.use(doubleCsrfProtection, csrfErrorHandler);
    app.use(paths.admin, checkAuthorization, adminRoute);
    app.use(paths.cart, checkAuthorization, cartRoute);
    app.use(paths.order, checkAuthorization, orderRoute);
    app.use(paths.images, checkAuthorization, imagesRoute);

    app.use(errorHandler);
};
