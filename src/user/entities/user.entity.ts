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
    
    @BeforeInsert()
    generateUuid() {
        if (!this.uuid) {
            this.uuid = uuidv4();
        }
    }
}


