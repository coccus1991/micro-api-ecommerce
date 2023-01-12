import express from "express";
import UsersRoute from "./routes/users/UsersRoute";
import {bootstrap} from "./bootstrap";
import OrdersRoute from "./routes/orders/OrdersRoute";
import ItemsRoute from "./routes/items/ItemsRoute";
import {logger} from "./services/logger";
import {env} from "./services/env";

async function main() {
    logger.info('Starting application...');

    await bootstrap();

    const app = express();

    app.use('/users', UsersRoute);
    app.use('/orders', OrdersRoute);
    app.use('/items', ItemsRoute);

    app.use('/health', (req, res) => {
        res.json({status: 'UP'});
    });

    app.listen(env.APP_PORT, () => logger.info('Server is running on port 3000'));
}

main();