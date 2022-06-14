import mongoose, { Schema } from 'mongoose'
import IHelperModel from '../interfaces/helper'

const productionSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model<IHelperModel>('Productions', productionSchema)