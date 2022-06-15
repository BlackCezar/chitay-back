import {Request, Response} from 'express'
import {Types} from 'mongoose'
import Products from '../models/Books'


const get = async (req: Request, res: Response) => {
	const id = new Types.ObjectId(req.params.id)
	const object = await Products.findOne({_id: id}).populate('categories').populate('production')

	res.json({
		code: 0,
		object
	})
}

const list = async (req: Request, res: Response) => {
	const params = {
		...req.query,
		categories: req.query.categories ? new Types.ObjectId(String(req.query.categories)) : undefined,
		title: req.query.title ? {$regex: req.query.title} : undefined
	}
	if (!req.query.categories) delete params.categories
	if (!req.query.title) delete params.title
	console.log(params)
	const array = await Products.find({
		...params
	}).populate('categories').populate('production').exec()

	res.json({
		code: 0,
		array
	})
}

type ImagePath = {
	path: string
}

const create = async (req: Request, res: Response) => {
	const data = JSON.parse(req.body.json)
	const files = req.files as Array<ImagePath>

	try {
		const object = await Products.create({
			...data, images: files.map(f => f.path)
		})
	
		res.json({
			code: 0,
			object
		})
	} catch (err) {

		console.log(err)
		res.json({
			code: 400,
			message: 'Ошибка при создании'
		})
	}
}

const remove = async (req: Request, res: Response) => {
	const id = new Types.ObjectId(req.params.id)
	const object = await Products.deleteOne({
		_id: id
	})

	res.json({
		code: 0,
		object
	})
}

const update = async (req: Request, res: Response) => {
	try {

		const id = new Types.ObjectId(req.params.id)


		await Products.updateOne({
			_id: id
		}, {
			$set: {
				...req.body
			}
		}).exec()

		const object = await Products.findOne({_id: id}).exec()

		res.json({
			code: 0,
			object
		})
	} catch (err) {
		res.json({
			code: 400,
			message: 'Ошибка при обновлении'
		})
	}
}

export default {get, list, create, remove, update}