import {Request, Response} from 'express'
import {Types} from 'mongoose'
import Productions from '../models/Productions'

const get = async (req: Request, res: Response) => {
	const object = await Productions.findOne({_id: new Types.ObjectId(req.params.id)})

	res.json({
		code: 0,
		object
	})
}

const list = async (req: Request, res: Response) => {
	const array = await Productions.find({
		...req.params
	}).exec()

	res.json({
		code: 0,
		array
	})
}

const create = async (req: Request, res: Response) => {
	try {
		const object = await Productions.create({
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
	const object = await Productions.deleteOne({
		_id: new Types.ObjectId(req.params.id)
	})

	res.json({
		code: 0,
		object
	})
}

const update = async (req: Request, res: Response) => {
	try {

		const id = new Types.ObjectId(req.params.id)


		await Productions.updateOne({
			_id: id
		}, {
			$set: {
				...req.body
			}
		}).exec()

		const object = await Productions.findOne({_id: id}).exec()

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