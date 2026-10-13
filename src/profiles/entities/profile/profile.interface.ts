import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Define the shape of Profile object for type safety
@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;
}