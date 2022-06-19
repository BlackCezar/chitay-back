import {Request, Response} from 'express'
import {Types} from 'mongoose'
import Orders from '../models/Orders'
import * as nodemailer from 'nodemailer'

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
			...req.body
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


const send = async (req: Request, res: Response) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.yandex.ru',
		port: 465,
		secure: true,
		auth: {
		  user: 'doctor-maxin@yandex.ru',
		  pass: 'lnwswhvndbqlmxgi',
		},
	  })

	  let result = await transporter.sendMail({
		from: '"Node js" <nodejs@example.com>',
		to: 'user@example.com, user@example.com',
		subject: 'Message from Node js',
		text: 'This message was sent from Node js server.',
		html:
		  'This <i>message</i> was sent from <strong>Node js</strong> server.',
	  })
	  console.log(result)
	  
}


export default {get, list, create, remove, update, send}