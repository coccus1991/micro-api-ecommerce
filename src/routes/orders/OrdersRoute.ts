import express from "express";
import {AppDataSource} from "../../services/DataSource";
import {Order} from "../../entities/Order";
const router = express.Router();

/**
 * @swagger
 *  /orders:
 *    get:
 *      summary: Retrieve a list of orders
 *      tags: [Orders]
 *      parameters:
 *        - in: query
 *          name: user_id
 *          schema:
 *            type: integer
 *            format: int64
 *          description: ID of the user to filter orders by
 *        - in: query
 *          name: item_id
 *          schema:
 *            type: integer
 *            format: int64
 *          description: ID of the item to filter orders by
 *      responses:
 *        "200":
 *          description: A list of orders
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Order'
 */
router.get('/', async (req, res) => {
    const user_id = req.query.user_id;
    const item_id = req.query.item_id;

    const queryBuilder = AppDataSource
        .getRepository(Order)
        .createQueryBuilder("order")
        .leftJoinAndSelect("order.items", "items")
        .leftJoinAndSelect("order.user", "user");

    if(user_id)  queryBuilder.where("user.id = :user_id", { user_id });
    if(item_id)  queryBuilder.andWhere("items.id = :item_id", { item_id });

    const orders = await queryBuilder.getMany();

    res.json(orders);
});

/**
 * @swagger
 * /order/{id}:
 *  get:
 *    summary: Retrieve a specific order by id
 *    tags: [Orders]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The id of the order
 *    responses:
 *      200:
 *        description: The order object
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Order'
 *      404:
 *        description: Order not found
 *        content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', async (req, res) => {
    const order = await AppDataSource.manager.findOne(Order, {where: {id: +req.params.id}, relations: ["items", "user"]});

    if(!order) {
        return res.status(404).json({message: "Order not found"});
    }

    res.json(order);
});


export default router;