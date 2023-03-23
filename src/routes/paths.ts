import type { Application } from "express";
import adminRoute from "./admin";
import cartRoute from "./cart";
import orderRoute from "./order";

const appBaseUrl = "api";

export const paths = {
    default: appBaseUrl,
    admin: `/${appBaseUrl}/admin`,
    product: `/${appBaseUrl}/product`,
    cart: `/${appBaseUrl}/cart`,
    order: `/${appBaseUrl}/order`
};

export const setupRoutes = (app: Application): void => {
    app.get(`/${paths.default}`, (_, response) => {
        response.send("The server is up and running!");
    });
    app.use(paths.admin, adminRoute);
    app.use(paths.cart, cartRoute);
    app.use(paths.order, orderRoute);
};
