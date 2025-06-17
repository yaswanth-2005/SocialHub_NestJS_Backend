import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const isDevelopment = process.env.NODE_ENV === "development";
  const devFrontendURL = "http://localhost:5173";
  const prodFrontendURL = process.env.FRONTEND_URL;

  // Enable CORS for frontend
  app.enableCors({
    origin: isDevelopment ? devFrontendURL : prodFrontendURL,
    credentials: true,
  });

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3000;

  await app.listen(port);
  console.log(`Backend is running on ${await app.getUrl()}`);
}
bootstrap();
