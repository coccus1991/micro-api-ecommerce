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