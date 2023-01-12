import {Entity, Column, PrimaryColumn, ManyToMany, JoinTable} from 'typeorm';
import {Order} from "./Order";

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