import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import mongoose from "mongoose";
import Users from "./models/Users";
import IUser from './interfaces/users';
import bcrypt from 'bcrypt'
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

declare module 'express-session' {
  interface SessionData {
    user: IUser;
    isAuth: boolean;
  }
}

import usersRouter from './routes/users'
import productionsRouter from './routes/productions'
import categoriesRouter from './routes/categories'
import ordersRouter from './routes/orders'
import productsRouter from './routes/products'

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'key',
    saveUninitialized: true
  }))

app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/productions', productionsRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  start()
})



async function start() {
  try {
    const configDB = {
      url: process.env.MONGO_USER ? `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}` : `mongodb://${process.env.MONGO_URL}`,
      options: {
      }
    }
    await mongoose.connect(configDB.url, configDB.options)

    const admin = await Users.findOne({login: process.env.ADMIN_LOGIN})
    if (!admin) {
      await Users.create({
        login: process.env.ADMIN_LOGIN || 'admin',
        password: await bcrypt.hash(process.env.ADMIN_PASS || 'admin', 10),
        role: 'Admin',
        fullname: 'Administrator'
      })
    }
    console.log('Mongoose connected')
  } catch (err) {
    console.log(err)
  }
}