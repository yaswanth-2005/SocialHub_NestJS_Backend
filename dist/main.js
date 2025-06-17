"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const isDevelopment = process.env.NODE_ENV === "development";
    const devFrontendURL = "http://localhost:5173";
    const prodFrontendURL = process.env.FRONTEND_URL;
    app.enableCors({
        origin: isDevelopment ? devFrontendURL : prodFrontendURL,
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Backend is running on ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map