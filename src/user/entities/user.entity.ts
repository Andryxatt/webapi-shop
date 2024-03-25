import { Role } from "@utils/role.enum";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
@Entity("user")
export class User {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column({
        type: "simple-array",
        default: [Role.User], // Default role as 'user'
    })
    roles: Role[]; // Array of roles
    @BeforeInsert()
    generateUuid() {
        if (!this.uuid) {
            this.uuid = uuidv4();
        }
    }
}


