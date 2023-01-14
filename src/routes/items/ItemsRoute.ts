import express from "express";
import {AppDataSource} from "../../services/DataSource";
import {Item} from "../../entities/Item";

const router = express.Router();

/**
 * @swagger
 * /items:
 *   get:
 *     description: Retrieve all items
 *     tags: [Items]
 *     produces:
 *       - application/json
 *     responses:
 *        "200":
 *          description: A list of orders
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Item'
 */
router.get('/', async (req, res) => {
    const items = await AppDataSource.getRepository(Item).find();
    res.json(items);
});

export default router;