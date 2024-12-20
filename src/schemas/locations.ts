import mongoose, { Schema, Document } from "mongoose";
interface ILocation extends Document{
    address: string;
    place_id: string;
    latitude: number;
    longitude: number;
}
const locationSchema = new Schema<ILocation>({
    address: { type: String, required: true },
    place_id: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
}, {timestamps: true});
const Location = mongoose.model<ILocation>('Locations', locationSchema);
export default Location;