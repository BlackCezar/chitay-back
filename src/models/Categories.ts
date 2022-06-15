import mongoose, { Schema } from 'mongoose'
import IHelperModel from '../interfaces/helper'

const CategoriesSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
        required: false
    }
}, {
    timestamps: true
})

export default mongoose.model<IHelperModel>('Categories', CategoriesSchema)