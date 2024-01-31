import { Injectable ,ConflictException} from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model ,Error as MongooseError } from "mongoose";
import { DuplicateException,CustomException } from './exceptions';
import { User, UserDocument } from "../user/user.model";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

  async signUp(body: { email: string; name: string; password: string }) {
    try {
    
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const user = new this.userModel({ ...body, password: hashedPassword });
      await user.save()
      return ("User Registration Completed")
      
      
    } catch (err) {
      console.log("err...", err)
    
      if (this.isDuplicateKeyError(err)) {
    
        throw new DuplicateException('Email is already registered, please signin');
     
      }
      
      throw new CustomException('Something went wrong while user registraion');
    }
  }

  private isDuplicateKeyError(error: any): boolean {
    // Check if the error is a MongoDB duplicate key error
    return error["code"]=== 11000;
  }

  async signIn(body: { email: string; password: string }) {
    // try {
    //   const user = await UserModel.findOne({ email: body.email }).maxTimeMS(20000);
    //   if (!user) {
    //     throw new Error('Email is not registered, please signup');
    //   }

    //   const isPasswordValid = await bcrypt.compare(body.password, user.password);
    //   if (!isPasswordValid) {
    //     throw new Error('Invalid password');
    //   }

    //   return { message: 'User authenticated successfully' };
    // }
    // catch (err) {
    //   console.log("err...", err)
    //   return { err };
    // }

  }
}
