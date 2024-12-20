import mongoose, { Schema, Document } from "mongoose";
interface IOrder extends Document{
    user: string;
    truck: string;
    status: string; 
    pickup: string;
    dropoff: string;
 }
 enum status{
    created = 'created',
    in_transit = 'in transit',
    completed = 'completed',
 }
 const orderSchema = new Schema<IOrder>({
    user: { type: String, required: true },
    truck: { type: String, required: true },
    status: { type: String, enum: Object.values(status), default: status.created },
    pickup: { type: String, required: true },
    dropoff: { type: String, required: true }
 }, {timestamps: true});
 const Order = mongoose.model<IOrder>('Orders', orderSchema);
 export default Order;