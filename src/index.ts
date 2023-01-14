import express from "express";
import UsersRoute from "./routes/users/UsersRoute";
import {bootstrap} from "./bootstrap";
import OrdersRoute from "./routes/orders/OrdersRoute";
import ItemsRoute from "./routes/items/ItemsRoute";
import {logger} from "./services/logger";
import {env} from "./services/env";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API title',
            version: '1.0.0',
            description: 'A sample API',
        },
        host: `localhost:${env.MAE_APP_PORT}`,
        basePath: '/',
    },
    apis: ['**/*.ts'], // <-- use your router file here
};

const specs = swaggerJsdoc(options);

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

    if (env.NODE_ENV === 'development') {
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
    }

    app.listen(env.MAE_APP_PORT, () => logger.info('Server is running on port 3000'));
}

main();