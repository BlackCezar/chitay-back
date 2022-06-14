import {Types, Document} from "mongoose";

export default interface IOrder extends Document{
	_id: Types.ObjectId,
	amount: number,
	status: string,
	user: Types.ObjectId,
	products: any,
	createdAt?: boolean | string,
	updatedAt?: boolean | string
}