import * as mongoose from 'mongoose';

// export const UserSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   name: { type: String, required: true },
//   password: { type: String, required: true },
// });

// export interface User extends mongoose.Document {
//   email: string;
//   name: string;
//   password: string;
// }

// export const UserModel = mongoose.model<User>('User', UserSchema);


import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type UserDocument = User & Document;
@Schema()
export class User {
    @Prop({required:true, unique:true, lowercase:true})
    email: string;
    @Prop({required:true})
    password: string
    @Prop({required:true})
    name: string;
}
export const UserSchema = SchemaFactory.createForClass(User)
