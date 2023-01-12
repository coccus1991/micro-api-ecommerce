import {loadData} from "./bootstrap";
import {AppDataSource} from "./services/DataSource";
import {User} from "./entities/User";
import {Item} from "./entities/Item";
import {Order} from "./entities/Order";
import {logger} from "./services/logger";

jest.setTimeout(20000);

describe('Bootstrap phase', function () {
    beforeAll(async () => {
        await AppDataSource.initialize();
        logger.silent = true;
    });

    afterAll(async () => {
        await AppDataSource.destroy()
    });

    it('Load data from csv files', async function () {
        await loadData();

        const users = await AppDataSource.getRepository(User).find();
        const items = await AppDataSource.getRepository(Item).find();
        const orders = await AppDataSource.getRepository(Order).find();

        expect(users.length).toBeGreaterThan(0);
        expect(items.length).toBeGreaterThan(0);
        expect(orders.length).toBeGreaterThan(0);
    });
});