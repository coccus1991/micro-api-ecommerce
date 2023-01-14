import express from "express";
import {bootstrap} from "../../bootstrap";
import {AppDataSource} from "../../services/DataSource";
import request from "supertest";
import ItemsRoute from "./ItemsRoute";

jest.setTimeout(10 * 1000);

describe("GET /items", () => {
    const app = express();

    beforeAll(async () => {
        await bootstrap()
        app.use('/items', ItemsRoute)
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it("should return list of items", async () => {
        const response = await request(app).get("/items");
        expect(response.status).toEqual(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("name");
        expect(response.body[0]).toHaveProperty("price");
    });
});

describe('GET /items/:id', () => {
    const app = express();

    beforeAll(async () => {
        await bootstrap()
        app.use('/items', ItemsRoute)
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('should return the item if it exists', async () => {
        const response = await request(app)
            .get('/items/1')
            .expect(200);

        expect(response.body).toEqual({
            id: 1,
            name: 'iPhone',
            price: 700,
            quantity: 10
        });
    });

    it('should return a 404 if the item does not exist', async () => {
        const response = await request(app)
            .get('/items/99')
            .expect(404);

        expect(response.body).toEqual({ message: 'Item not found' });
    });
});