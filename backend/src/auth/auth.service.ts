import { Injectable } from '@nestjs/common';
import { UserModel } from '../user/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    async signUp(body: { email: string; name: string; password: string }) {
        try{
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const user = new UserModel({ ...body, password: hashedPassword });
        await user.save();
        return { message: 'User registered successfully' };
        }catch(err){
          console.log("err...",err)
          return { error: 'Something went wrong while user registraion' };
        }
    }
    
}
