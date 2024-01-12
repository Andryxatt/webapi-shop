import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import * as express from "express";
import { join } from "path";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
async function bootstrap() {
  const corsOptions: CorsOptions = {
    origin: ["https://step-in-style.shop", "http://localhost/5173"], // Replace with your React app's domain
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  };
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle("Web Api").setDescription("The webapi API description").setVersion("1.0").addBearerAuth().addTag("api").build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.enableCors(corsOptions);
  app.use("/uploads/files/", express.static(join(__dirname, "..", "uploads/files/")));
  app.useGlobalPipes(new ValidationPipe());
  app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
