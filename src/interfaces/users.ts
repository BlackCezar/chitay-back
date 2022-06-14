import {Types, Document} from "mongoose";

enum UserRole {
	User = 'User',
	Admin = 'Admin',
}

export default interface IUser extends Document{
	_id: Types.ObjectId,
	fullname: string,
	login: string,
	password: string,
	role: UserRole,
	createdAt?: boolean | string,
	updatedAt?: boolean | string
}