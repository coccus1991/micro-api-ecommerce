import request from "supertest";
import {bootstrap} from "../../bootstrap";
import {AppDataSource} from "../../services/DataSource";
import OrdersRoute from "./OrdersRoute";
import express from "express";

jest.setTimeout(10 * 1000);

describe("GET /orders", () => {
    const app = express();

    beforeAll(async () => {
        await bootstrap();
        app.use('/orders', OrdersRoute);
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it("should return list of orders", async () => {
        const response = await request(app).get("/orders");
        expect(response.status).toEqual(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("user");
        expect(response.body[0]).toHaveProperty("items");
        expect(response.body.length).toBeGreaterThan(2);
    });
});

describe('GET /order/:id', () => {
    const app = express();

    beforeAll(async () => {
        await bootstrap();
        app.use('/orders', OrdersRoute);
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('should return an order with the specified id, its related items and user', async () => {
        const orderId = 1;
        const expectedResult = {
            id: 1,
            quantity: 2,
            date: "2022-12-20T00:00:00.000Z",
            items: [
                {id: 1, name: "iPhone", price: 700, quantity: 10},
                {id: 2, name: "Samsung Galaxy", price: 650, quantity: 5}
            ],
            user: {
                id: 1,
                username: "johndoe",
                email: "johndoe@example.com",
                password: "mypassword"
            }
        };

        const response = await request(app).get(`/orders/${orderId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResult);
    });

    it('should return a 404 status code if the order does not exist', async () => {
        const orderId = 99;


        const response = await request(app).get(`/orders/${orderId}`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({message: 'Order not found'});
    });
});
