import { Injectable ,ConflictException} from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model ,Error as MongooseError } from "mongoose";
import { DuplicateException,CustomException } from './exceptions';
import { User, UserDocument,UserSchema } from "../user/user.model";
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
      return (user)
      
      
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

  //signin service

  async signIn(body: { email: string; password: string }) {
    try {
      const user = await this.userModel.findOne({ email: body.email });
      console.log("email...,",user)
      if (!user) {
       throw new Error('not found')
       
      }
      const isPasswordValid = await bcrypt.compare(body.password, user.password);
      if (!isPasswordValid) {
        throw new Error('invalid password');
        
      }

      return (user);
    }
    catch (err) {
      console.log("err...", err.message)
      if(err.message=="not found")
      {
        console.log("yes")
        throw new CustomException('Email is not registered, please signup',404);
      }
       
      else if(err.message=="invalid password")
      throw new CustomException('Invalid password');
       else
      throw new CustomException('Something went wrong while user signin');
    }

  }
}
