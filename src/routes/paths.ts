import type { Application } from "express";
import adminRoute from "./admin";
import cartRoute from "./cart";
import orderRoute from "./order";
import authRoute from "./auth";
import { checkAuthorization } from "../middleware/is-auth";
import shopRoute from "./shop";
import { doubleCsrfProtection, csrfErrorHandler } from "../security/csrf";
import { errorHandler } from "../middleware/error";

const APP_BASE_URL = "api";

const paths = {
    default: APP_BASE_URL,
    admin: `/${APP_BASE_URL}/admin`,
    product: `/${APP_BASE_URL}/product`,
    cart: `/${APP_BASE_URL}/cart`,
    order: `/${APP_BASE_URL}/order`,
    auth: `/${APP_BASE_URL}/auth`,
    shop: `/${APP_BASE_URL}/product`
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

    app.use(errorHandler);
};
