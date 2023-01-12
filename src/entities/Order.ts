import {Entity, Column, ManyToOne, JoinColumn, PrimaryColumn, ManyToMany, JoinTable} from 'typeorm';
import { User } from './User';
import { Item } from './Item';

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