import express from "express";
import {User} from "../../entities/User";
import {AppDataSource} from "../../services/DataSource";
import {ErrorResponse} from "../../types/ErrorResponse";

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

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', async (req, res) => {
    const user = await AppDataSource.manager.findOne(User, {where: {id: +req.params.id}});

    if (!user) {
        return res.status(404).json({message: 'User not found'} as ErrorResponse);
    }

    res.json(user);
});

export default router;