import express from "express";
import {AppDataSource} from "../../services/DataSource";
import {Item} from "../../entities/Item";

const router = express.Router();

router.get('/', async (req, res) => {
    const items = await AppDataSource.getRepository(Item).find();
    res.json(items);
});

export default router;