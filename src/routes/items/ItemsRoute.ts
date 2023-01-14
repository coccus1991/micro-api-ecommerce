import express from "express";
import {AppDataSource} from "../../services/DataSource";
import {Item} from "../../entities/Item";
import {ErrorResponse} from "../../types/ErrorResponse";

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

/**
 * @swagger
 * /items/{id}:
 *  get:
 *    tags: [Items]
 *    description: Returns a single item by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of item to return
 *    responses:
 *      200:
 *        description: Item object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Item'
 *      404:
 *        description: Item not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', async (req, res) => {
    const item = await AppDataSource.manager.findOne(Item, {where: {id: +req.params.id}});

    if (!item) {
        return res.status(404).json({message: 'Item not found'} as ErrorResponse);
    }

    res.json(item);
});

export default router;