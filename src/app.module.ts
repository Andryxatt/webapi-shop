/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { BrandsModule } from './brands/brands.module';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { CategoriesModule } from './categories/categories.module';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { ProductsModule } from './products/products.module';
import { SizesModule } from './sizes/sizes.module';
import { ProductToSizeModule } from './product-to-size/product-to-size.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SeasoneModule } from './seasone/seasone.module';
import { ColoreModule } from './colore/colore.module';
import { GenderModule } from './gender/gender.module';
import { DiscountModule } from './discount/discount.module';
import { FeaturesModule } from './features/features.module';
import { ProductFeaturesModule } from './product-features/product-features.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      })
    }),
    BrandsModule,
    CategoriesModule,
    SubCategoriesModule,
    ProductImagesModule,
    ProductsModule,
    SizesModule,
    SeasoneModule,
    ProductToSizeModule,
    OrderItemModule,
    OrderModule,
    AuthModule,
    UsersModule,
    SeasoneModule,
    ColoreModule,
    GenderModule,
    DiscountModule,
    FeaturesModule,
    ColoreModule,
    ProductFeaturesModule,
    ProductFeaturesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource
  ) {}
}
