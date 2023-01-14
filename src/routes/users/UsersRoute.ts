import express from "express";
import {User} from "../../entities/User";
import {AppDataSource} from "../../services/DataSource";

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Return all users
 *     description: Return all users in the database
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: An array of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/User'
 */
router.get('/', async (req, res) => {
    const users = await AppDataSource.getRepository(User).find();
    res.json(users);
});

export default router;