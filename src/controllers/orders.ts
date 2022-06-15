import {Request, Response} from 'express'
import {Types} from 'mongoose'
import Orders from '../models/Orders'

const get = async (req: Request, res: Response) => {
	const id = new Types.ObjectId(req.params.id)
	const object = await Orders.findOne({_id: id})

	res.json({
		code: 0,
		object
	})
}

const list = async (req: Request, res: Response) => {
	const array = await Orders.find({
		...req.params
	}).exec()

	res.json({
		code: 0,
		array
	})
}

const create = async (req: Request, res: Response) => {
	try {
		const object = await Orders.create({
			name: req.params.name,
			parent: req.params.parent
		})
	
		res.json({
			code: 0,
			object
		})
	} catch (err) {
		res.json({
			code: 400,
			message: 'Ошибка при создании'
		})
	}
}

const remove = async (req: Request, res: Response) => {
	const id = new Types.ObjectId(req.params.id)
	const object = await Orders.deleteOne({
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


		await Orders.updateOne({
			_id: id
		}, {
			$set: {
				...req.body
			}
		}).exec()

		const object = await Orders.findOne({_id: id}).exec()

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