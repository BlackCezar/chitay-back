import {Types, Document} from "mongoose";

export default interface IBook extends Document{
	_id: Types.ObjectId,
	title: string,
	author: string,
	artikle: string,
	year: number,
	pagesCount: number,
	format: string, 
	typeWrapper: string,
	descripton: string,
    weigh: number,
    ageRestriction: number,
    price: number,
    categories: Types.ObjectId,
    production: Types.ObjectId,
    quantity: number,
	createdAt?: boolean | string,
	updatedAt?: boolean | string
}