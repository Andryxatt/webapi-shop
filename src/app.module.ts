/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BrandsModule } from "./brands/brands.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CategoriesModule } from "./categories/categories.module";
import { SubCategoriesModule } from "./sub-categories/sub-categories.module";
import { ProductImagesModule } from "./product-images/product-images.module";
import { ProductsModule } from "./products/products.module";
import { SizesModule } from "./sizes/sizes.module";
import { ProductToSizeModule } from "./product-to-size/product-to-size.module";
import { OrderItemModule } from "./order-item/order-item.module";
import { OrderModule } from "./order/order.module";
import { SeasoneModule } from "./seasone/seasone.module";
import { ColoreModule } from "./colore/colore.module";
import { GenderModule } from "./gender/gender.module";
import { DiscountModule } from "./discount/discount.module";
import { FeaturesModule } from "./features/features.module";
import { ProductFeaturesModule } from "./product-features/product-features.module";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import typeorm from "@config/typeorm";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get("typeorm"),
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get('DB_HOST'),
    //     port: parseInt(configService.get('DB_PORT'), 10) || 5432,
    //     username: configService.get('DB_USERNAME'),
    //     password: configService.get('DB_PASSWORD'),
    //     database: configService.get('DB_DATABASE'),
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     migrations: [__dirname + '/migrations/*{.ts,.js}'],
    //     synchronize: true,
    //     autoLoadEntities: true,
    //   }),
    //   inject: [ConfigService],
    // }),

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
    SeasoneModule,
    ColoreModule,
    GenderModule,
    DiscountModule,
    FeaturesModule,
    ColoreModule,
    ProductFeaturesModule,
    ProductFeaturesModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
