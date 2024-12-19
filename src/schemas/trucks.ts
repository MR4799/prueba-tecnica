import mongoose, { Schema, Document, ObjectId } from "mongoose";
interface ITruck extends Document{
    user: string;
    year: string;
    color: string;
    plates: string;
}
const truckSchema = new Schema<ITruck>({
    user: { type: String, required: true },
    year: { type: String, required: true },
    color: { type: String, required: true },
    plates: { type: String, required: true }
}, {timestamps: true});
const Truck =  mongoose.model<ITruck>('Trucks', truckSchema);
export default Truck;