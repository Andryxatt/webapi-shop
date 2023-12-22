import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle("Web Api").setDescription("The webapi API description").setVersion("1.0").addBearerAuth().addTag("api").build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const port: number = parseInt(`${process.env.PORT}`) || 3000;
  await app.listen(port);
}
bootstrap();
