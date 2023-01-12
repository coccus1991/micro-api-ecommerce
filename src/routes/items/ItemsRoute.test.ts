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