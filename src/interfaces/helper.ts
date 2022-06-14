import {Document, Types} from "mongoose";

export default interface IHelperModel extends Document{
	_id: Types.ObjectId,
	name: string,
	parent?: Types.ObjectId | undefined,
	createdAt?: boolean | string,
	updatedAt?: boolean | string
}