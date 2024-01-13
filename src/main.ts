import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import * as express from "express";
import { join } from "path";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  const config = new DocumentBuilder().setTitle("Web Api").setDescription("The webapi API description").setVersion("1.0").addBearerAuth().addTag("api").build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.use("/uploads/files/", express.static(join(__dirname, "..", "uploads/files/")));
  app.useGlobalPipes(new ValidationPipe());
  app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
function cors(): any {
  throw new Error("Function not implemented.");
}
