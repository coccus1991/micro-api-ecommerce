import {Entity, Column, PrimaryColumn, ManyToMany, JoinTable} from 'typeorm';
import {Order} from "./Order";

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - price
 *         - orders
 *         - quantity
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         name:
 *           type: string
 *         price:
 *           type: number
 *           format: double
 *         quantity:
 *           type: integer
 */
@Entity()
export class Item {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column('real')
    price: number;

    @ManyToMany(type => Order)
    @JoinTable()
    orders: Order[];

    @Column()
    quantity: number;
}