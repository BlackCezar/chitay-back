import mongoose, { Schema } from 'mongoose'
import IUser from '../interfaces/users'

const userSchema: Schema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        required: true
    },
}, {
    timestamps: true
})

export default mongoose.model<IUser>('User', userSchema)