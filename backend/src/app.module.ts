import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/EasyGenConsole'),


    MongooseModule.forRoot('mongodb+srv://admin:admin123@cluster0.ujrapcs.mongodb.net/'),
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
