import express from "express";
import {AppDataSource} from "../../services/DataSource";
import {Order} from "../../entities/Order";
const router = express.Router();

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


export default router;