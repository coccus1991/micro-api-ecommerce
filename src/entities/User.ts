import {Entity, Column, OneToMany, PrimaryColumn} from 'typeorm';
import {Order} from "./Order";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 */
@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @Column()
    username: string;

    @OneToMany(type => Order, order => order.user)
    orders: Order[];

    @Column()
    email: string;

    @Column()
    password: string;
}
