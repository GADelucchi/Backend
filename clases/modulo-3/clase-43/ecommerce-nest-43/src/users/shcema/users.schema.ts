import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UsersDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({ required: true })
    first_name: string
    @Prop({ required: true })
    last_name: string
    @Prop({ required: true, unique: true, lowercase: true })
    email: string
    @Prop({ required: true })
    password: string
    @Prop({ default: 'user' })
    role: string
}

export const UserSchema = SchemaFactory.createForClass(User)