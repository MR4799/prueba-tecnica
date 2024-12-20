import { Request, Response } from "express";
async function WithoutTrucks(_req: Request, res: Response, truck: unknown): Promise<Response | any> {
        return res.status(200).json({ message: "truck doesn´t exist", truck, });
}
async function WithoutLocations(_req: Request, res: Response, location: unknown): Promise<Response | any> {
        return res.status(200).json({ message: "Location doesn´t exist", location, });
}
async function WithoutOrders(_req: Request, res: Response, order: unknown): Promise<Response | any> {
        return res.status(200).json({ message: "Order doesn´t exist", order, });
}
export{
    WithoutTrucks,
    WithoutLocations,
    WithoutOrders,
}