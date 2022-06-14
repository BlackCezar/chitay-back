import mongoose, { Schema } from 'mongoose'
import IOrder from '../interfaces/orders'

const orderSchema: Schema = new Schema({
    amount: Number,
    status: {
        type: String,
        enum: ['В ожидании', 'В обработке', 'Отменен', 'В пути', 'Доставлен', 'Ожидает оплаты', 'Оплачен']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    products: {
        type: [{
            qty: Number,
            product: Schema.Types.ObjectId
        }],
        ref: 'Lessons'
    }
}, {
    timestamps: true
})

export default mongoose.model<IOrder>('Orders', orderSchema)