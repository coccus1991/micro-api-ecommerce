import {Entity, Column, OneToMany, PrimaryColumn} from 'typeorm';
import {Order} from "./Order";

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
