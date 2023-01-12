import {AppDataSource} from "../../services/DataSource";
import {bootstrap} from "../../bootstrap";
import request from "supertest";
import express from "express";
import UsersRoute from "./UsersRoute";

jest.setTimeout(10 * 1000);

describe("GET /users", () => {
    let app = express();

    beforeAll(async () => {
        await bootstrap();
        app.use('/users', UsersRoute);
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it("should return list of users", async () => {
        const response = await request(app).get("/users");
        expect(response.status).toEqual(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("username");
        expect(response.body[0]).toHaveProperty("email");
        expect(response.body[0]).toHaveProperty("password");
    });
});