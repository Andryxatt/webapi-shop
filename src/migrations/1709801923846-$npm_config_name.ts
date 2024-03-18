import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1709801923846 implements MigrationInterface {
    name = ' $npmConfigName1709801923846'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS "user" (
            "uuid" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            "name" character varying NOT NULL,
            "email" character varying NOT NULL,
            "password" character varying NOT NULL
          );
        `);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "user";`);
      }

}
