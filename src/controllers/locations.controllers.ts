import { NextFunction, Request, Response } from "express";
import Location from "../schemas/locations";
import dotenv from 'dotenv';
import errorMessage from "../utils/errorMesage";
import axios from 'axios';
import { WithoutLocations } from "../utils/commonResponses";
dotenv.config();
async function getAllLocations(_req: Request, res: Response): Promise<Response | any> {
    try {
        const locations = await Location.find().exec();
        if (locations.length === 0) {
            return res.status(400).json({ message: "Without locations", locations, });
        }
        return res.status(200).json({ message: "Locations successfully obtained", locations, });
    } catch (error) {
        errorMessage(_req, res, error);
    }
}
async function findOneLocation(req: Request, res: Response): Promise<Response | any> {
    try {
        const _id = req.params.id;
        const location = await Location.findById(_id).exec();
        WithoutLocations(req, res, location);
        return res.status(200).json({ message: "Location found", location, });
    } catch (error) {
        errorMessage(req, res, error);
    }
}
async function createLocation(req: Request, res: Response): Promise<Response | any> {
    try {
        const place_id = req.body.place_id;
        const location = await Location.findOne({place_id});
        if (location !== null) {
            return res.status(400).json({ message: "location already exists", location, });
        }
        const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${process.env.MAPS}`;
        await axios.get(url)
        .then(async (response) =>{
                const placeDetails = response.data.result;
                const address = placeDetails.address_components[0].long_name + ", " +  placeDetails.address_components[1].long_name + ", " +  placeDetails.address_components[2].long_name;
                const latitude: number = placeDetails.geometry.location.lat;
                const longitude: number = placeDetails.geometry.location.lng;
                const newLocation = new Location({
                    address,
                    place_id,
                    latitude,
                    longitude,
                });
                await newLocation.save(); 
                return res.status(200).json({ message: "Location successfully created", newLocation, });   
            })
            .catch((error) =>{
                return res.status(200).json({ message: "Place doesn´t exist", error, });
            });
    } catch (error) {
        errorMessage(req, res, error);
    }
}
async function updateLocation(req: Request, res: Response): Promise<Response | any> {
    try {
        const _id = req.params.id;
        const location = await Location.findById(_id).exec();
        WithoutLocations(req, res, location);
        const place_id = req.body.place_id;
        const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${process.env.MAPS}`;
        await axios.get(url)
        .then(async (response) =>{
                const placeDetails = response.data.result;
                const address = placeDetails.address_components[0].long_name + ", " +  placeDetails.address_components[1].long_name + ", " +  placeDetails.address_components[2].long_name;
                const latitude: number = placeDetails.geometry.location.lat;
                const longitude: number = placeDetails.geometry.location.lng;
                const updatedLocation = await Location.findByIdAndUpdate(_id, {address, place_id, latitude, longitude}, { new: true });
                return res.status(200).json({ message: "Location successfully updated", updatedLocation, });   
            })
            .catch((error) =>{
                return res.status(200).json({ message: "Place doesn´t exist", error, });
            });
    } catch (error) {
        errorMessage(req, res, error);
    }
}
async function deleteLocation(req: Request, res: Response): Promise<Response | any> {
    try {
        const _id = req.params.id;
        const location = await Location.findByIdAndDelete(_id);
        WithoutLocations(req, res, location);
        return res.status(200).json({ message: "Location successfully deleted", _id, });
    } catch (error) {
        errorMessage(req, res, error);
    }
}
export {
    getAllLocations,
    findOneLocation,
    createLocation,
    updateLocation,
    deleteLocation,
}