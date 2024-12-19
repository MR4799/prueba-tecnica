import { Request, Response } from "express";
import Truck from "../schemas/trucks";
import dotenv from 'dotenv';
import errorMessage from "../utils/errorMesage";
import User from "../schemas/users";
dotenv.config();
async function createTruck(req: Request, res: Response): Promise<Response | any> {
    try {
        const user: string = req.body.user;
        const year: string = req.body.year;
        const color: string = req.body.color;
        const plates: string = req.body.plates;
        if (user === undefined || year === undefined || color === undefined || plates === undefined) {
            return res.status(400).json({ message: "user, year, color and plates are required", });
        }
        if (user.length !== 24) {
            return res.status(400).json({ message: "User must be 24 characters id", user, });
        }
        const verifyUser = await User.findById(user).exec();
        if (verifyUser === null) {
            return res.status(400).json({ message: "User doesn´t exist", verifyUser, });
        }
        const truck = await Truck.findOne({plates}).exec();
        if (truck !== null) {
            return res.status(400).json({ message: "Plates already exist", truck, });
        }
        const newTruck = new Truck({
            user,
            year,
            color,
            plates,
        });
        await newTruck.save();
        return res.status(200).json({ message: "Truck created successfully", newTruck, });
    } catch (error) {
        errorMessage(req, res, error);
    }
}
async function getAllTrucks(_req: Request, res: Response): Promise<Response | any> {
    try {
        const trucks = await Truck.find().exec();
        if (trucks.length === 0) {
            return res.status(400).json({ message: "Without trucks", trucks, });
        }
        
        return res.status(200).json({ message: "Trucks obtained successfully", trucks, });
    } catch (error) {
        errorMessage(_req, res, error);
    }
}
async function findOneTruck(req: Request, res: Response): Promise<Response | any> {
    try {
        const _id = req.params.id;
        const truck = await Truck.findById(_id).exec();
        if (truck === null) {
            return res.status(400).json({ message: "Truck doesn´t exist", truck, });
        }
        return res.status(200).json({ message: "Truck obtained successfully", truck, });
    } catch (error) {
        errorMessage(req, res, error);
    }
}
async function updateTruck(req: Request, res: Response): Promise<Response | any> {
    try {
        const _id = req.params.id;
        const truck = await Truck.findById(_id).exec();
        if (truck === null) {
            return res.status(400).json({ message: "Truck doesn´t exist", truck, });
        }
        const updatedTruck = await Truck.findByIdAndUpdate(_id, {$set: req.body}, {new: true});
        return res.status(200).json({ message: "Truck updated successfully", updatedTruck, });
    } catch (error) {
        errorMessage(req, res, error);
    }
}
async function deleteTruck(req: Request, res: Response): Promise<Response | any> {
    try {
        const _id = Object(req.params.id);
        const truck = await Truck.findByIdAndDelete(_id);
        if (truck === null) {
            return res.status(400).json({ message: "Truck doesn´t exist", truck, });
        }
        return res.status(200).json({ message: "Truck deleted successfully", _id, });
    } catch (error) {
        errorMessage(req, res, error);
    }
}
export {
    createTruck,
    getAllTrucks,
    findOneTruck,
    updateTruck,
    deleteTruck,
}