import express from "express";
import {User} from "../../entities/User";
import {AppDataSource} from "../../services/DataSource";

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await AppDataSource.getRepository(User).find();
    res.json(users);
});

export default router;