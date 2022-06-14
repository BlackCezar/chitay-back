import mongoose, { Schema, Types } from 'mongoose'
import IHelperModel from '../interfaces/helper'

const CategoriesSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    parent: {
        type: Schema.Types.ObjectId,
    }
}, {
    timestamps: true
})

export default mongoose.model<IHelperModel>('Categories', CategoriesSchema)