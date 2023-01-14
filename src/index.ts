import express from "express";
import UsersRoute from "./routes/users/UsersRoute";
import {bootstrap} from "./bootstrap";
import OrdersRoute from "./routes/orders/OrdersRoute";
import ItemsRoute from "./routes/items/ItemsRoute";
import {logger} from "./services/logger";
import {env} from "./services/env";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// @ts-ignore
import packageJson from "../package.json";

const options: swaggerJsdoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: packageJson.name,
            version: packageJson.version,
            description: packageJson.description,
        },
        host: `localhost:${env.MAE_APP_PORT}`,
        basePath: '/',
    },
    apis: ['**/*.ts'], // <-- use your router file here
};

const specs = swaggerJsdoc(options);

(async function () {
    logger.info(`Starting application...`);

    await bootstrap();

    const app = express();

    // logging requests
    app.use((req, res, next) => {
        logger.info(`Api request: [${req.method}] ${req.url}`);
        next();
    });

    app.use('/users', UsersRoute);
    app.use('/orders', OrdersRoute);
    app.use('/items', ItemsRoute);

    app.use('/health', (req, res) => {
        res.json({status: 'UP'});
    });

    if (env.NODE_ENV === 'development') {
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
    }

    app.listen(env.MAE_APP_PORT, () => logger.info(`Server is running on port ${env.MAE_APP_PORT}`));
}());

process.on('SIGINT', function () {
    logger.warn('Caught interrupt signal');
    process.exit();
});