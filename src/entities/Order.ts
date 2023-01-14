import {Entity, Column, ManyToOne, JoinColumn, PrimaryColumn, ManyToMany, JoinTable} from 'typeorm';
import { User } from './User';
import { Item } from './Item';

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - id
 *         - user
 *         - items
 *         - quantity
 *         - date
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         user:
 *           $ref: '#/components/schemas/User'
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Item'
 *         quantity:
 *           type: integer
 *         date:
 *           type: string
 *           format: date
 */
@Entity()
export class Order {
    @PrimaryColumn()
    id: number;

    @ManyToOne(type => User, user => user.orders)
    @JoinColumn({ name: "user_id"})
    user: User;

    @ManyToMany(type => Item)
    @JoinTable()
    items: Item[];

    @Column()
    quantity: number;

    @Column()
    date: Date;
}