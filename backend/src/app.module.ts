import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/EasyGenConsole'),

    MongooseModule.forRoot('mongodb+srv://r4raheesamumthaz:admin123@cluster0.ujrapcs.mongodb.net/EasyGenConsole?retryWrites=true&w=majority'),
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
