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

describe('GET /users/:id', () => {
    let app = express();

    beforeAll(async () => {
        await bootstrap();
        app.use('/users', UsersRoute);
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    test('should return a user when the id is valid', async () => {
        const response = await request(app).get('/users/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            "id": 1,
            "username": "johndoe",
            "email": "johndoe@example.com",
            "password": "mypassword"
        });
    });

    test('should return a 404 error when the id is not valid', async () => {
        const response = await request(app).get('/users/1000');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            "message": "User not found"
        });
    });
});
