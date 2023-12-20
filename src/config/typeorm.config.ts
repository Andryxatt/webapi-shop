/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default class TypeOrmConfig {
  static getOrmConfig(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
      migrations: [__dirname + "/migrations/*{.ts,.js}"],
      migrationsTableName: "migrations_typeorm"
    };
  }
}
