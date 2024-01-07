/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_LOCAL_HOST,
  port: parseInt(process.env.PORT_LOCAL) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_LOCAL_PASSWORD,
  database: process.env.DB_LOCAL_DATABASE,
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  synchronize: true,
  autoLoadEntities: true,
  ssl: {
    rejectUnauthorized: false, // Disable SSL verification
  },
};
