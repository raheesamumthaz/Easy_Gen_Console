import { Injectable } from '@nestjs/common';
import { UserModel } from '../user/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  async signUp(body: { email: string; name: string; password: string }) {
    try {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const user = new UserModel({ ...body, password: hashedPassword });
      await user.save();
      return { message: 'User registered successfully' };
    } catch (err) {
      console.log("err...", err)
      return { err };
    }
  }

  async signIn(body: { email: string; password: string }) {
    try {
      const user = await UserModel.findOne({ email: body.email });
      if (!user) {
        throw new Error('Email is not registered, please signup');
      }

      const isPasswordValid = await bcrypt.compare(body.password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      return { message: 'User authenticated successfully' };
    }
    catch (err) {
      console.log("err...", err)
      return { err };
    }

  }
}
