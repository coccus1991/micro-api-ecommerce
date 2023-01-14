import fs from 'fs';
import csv from 'csv-parser';
import {User} from './entities/User';
import {Item} from './entities/Item';
import {Order} from './entities/Order';
import {AppDataSource} from "./services/DataSource";
import {env} from "./services/env";
import {logger} from "./services/logger";

async function setupDb() {
    try {
        await AppDataSource.initialize();
        logger.info("Connected to DB");
    } catch (error) {
        logger.error(error);
    }
}

export async function loadData() {
    try {
        logger.info("Loading data from CSV files");

        const users = [];
        const items = [];
        const orders = [];
        const orders_items = [];

        // read users data from csv file
        await new Promise((resolve, reject) => {
            fs.createReadStream(env.MAE_FILE_PATH + '/users.csv')
                .pipe(csv())
                .on('data', (data) => {
                    users.push(data);
                })
                .on('error', (error) => reject(error))
                .on('end', async () => {
                    // save users to database
                    await AppDataSource.manager.save(users.map(user => AppDataSource.manager.create(User, user)));
                    resolve(0);
                    logger.info('Users data loaded successfully.');
                });
        });

        // read items data from csv file
        await new Promise((resolve, reject) => {
            fs.createReadStream(env.MAE_FILE_PATH + '/items.csv')
                .pipe(csv())
                .on('error', (error) => reject(error))
                .on('data', (data) => {
                    items.push(data);
                })
                .on('end', async () => {
                    // save items to database
                    await AppDataSource.manager.save(items.map(item => AppDataSource.manager.create(Item, item)));
                    resolve(0);
                    logger.info('Items data loaded successfully.');
                })
        });

        // read relations order and items from csv file
        await new Promise((resolve, reject) => {
            fs.createReadStream(env.MAE_FILE_PATH + '/orders_items_pivot.csv')
                .pipe(csv())
                .on('error', (error) => reject(error))
                .on('data', (data) => {
                    orders_items.push(data);
                })
                .on('end', async () => {
                    resolve(0);
                })
        });

        // read orders data from csv file and create relation with items
        await new Promise((resolve, reject) => {
            fs.createReadStream(env.MAE_FILE_PATH + '/orders.csv')
                .pipe(csv())
                .on('error', (error) => reject(error))
                .on('data', (data) => {
                    orders.push(data);
                })
                .on('end', async () => {
                    // save orders to database
                    await AppDataSource.manager.save(await Promise.all(orders.map(async order => {
                        const newOrder = AppDataSource.manager.create(Order, order);

                        // retrieve user from database for relation
                        newOrder.user = await AppDataSource.manager.findOne(User, {where: {id: order.user_id}});

                        // retrieve items from database for relation
                        newOrder.items = await Promise.all(
                            orders_items.filter(order_item => order_item.order_id === order.id)
                                .map(async order_item => {
                                    return await AppDataSource.manager.findOne(Item, {where: {id: order_item.item_id}});
                                }));

                        return newOrder;
                    })));

                    resolve(0);

                    logger.info('Orders data loaded successfully.');
                });
        });

        logger.info("Data loaded successfully");
    } catch (error) {
        logger.error("Error loading data from CSV files: " + error.message);
        process.exit(1);
    }
}

export const bootstrap = async () => {
    await setupDb();
    await loadData();
};