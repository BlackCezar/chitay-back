import {Request, Response} from 'express'
import {Types} from 'mongoose'
import Categories from '../models/Categories'

const get = async (req: Request, res: Response) => {
	const id = req.params.id || ''
	const object = await Categories.findOne({_id: new Types.ObjectId(id)})

	res.json({
		code: 0,
		object
	})
}

const list = async (req: Request, res: Response) => {
	const array = await Categories.find({
		...req.params
	}).populate('parent').exec()

	res.json({
		code: 0,
		array
	})
}

const create = async (req: Request, res: Response) => {
	try {
		const object = await Categories.create({
			name: req.body.name,
			parent: req.body.parent ? req.body.parent : undefined 
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
	const id = req.params.id || ''

	const object = await Categories.deleteOne({
		_id: new Types.ObjectId(id)
	})

	res.json({
		code: 0,
		object
	})
}

const update = async (req: Request, res: Response) => {
	try {
		const id = new Types.ObjectId(req.params.id)


		await Categories.updateOne({
			_id: id
		}, {
			$set: {
				...req.body
			}
		}).exec()

		const object = await Categories.findOne({_id: id}).exec()

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