import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all routes
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
  };

  app.enableCors(corsOptions);
  await app.listen(4000,function(){
    console.log("app is running at http://localhost:4000")
  });
}
bootstrap();
