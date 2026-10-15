import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Maps the class to a database table named 'profile'
@Entity('profile')
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;
}