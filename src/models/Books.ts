import mongoose, { Schema } from 'mongoose'
import IBook from '../interfaces/books'

const bookSchema: Schema = new Schema({
    title: String,
    author: String,
    artikle: String,
    year: Number,
    pagesCount: Number,
    format: String,
    typeWrapper: {
        type: String,
        enum: ['Мягкая бумажная', 'Твердая']
    },
    descripton: String,
    weigh: Number,
    ageRestriction: Number,
    price: Number,
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    },
    production: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Productions'
    },
    quantity: Number
}, {
    timestamps: true
})

export default mongoose.model<IBook>('Books', bookSchema)