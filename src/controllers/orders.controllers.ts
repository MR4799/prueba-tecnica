import { Request, Response } from "express";
import errorMessage from "../utils/errorMesage";
import Order from "../schemas/orders";
import Truck from "../schemas/trucks";
import Location from "../schemas/locations";
import { WithoutOrders } from "../utils/commonResponses";
async function getAllOrders(_req: Request, res: Response): Promise<Response | any> {
    try {
        const orders = await Order.find().exec();
        if (orders.length === 0) {
            return res.status(400).json({ message: "Without orders", orders, });
        }
        return res.status(200).json({ message: "Orders successfully obtained", orders, });
    } catch (error) {
        errorMessage(_req, res, error);
    }
}
async function createOrder(req: Request, res: Response): Promise<Response | any> {
    try {
        const user = req.cookies._id;
        const truck: string = req.body.truck;
        const pickup: string = req.body.pickup;
        const dropoff: string = req.body.dropoff;
        if (truck === undefined || pickup === undefined || dropoff === undefined) {
            return res.status(400).json({ message: "truck, pickup and dropoff are necessary", });
        }
        if (truck.length !== 24) {
            return res.status(400).json({ message: "Truck must be 24 characters id", truck, });
        }
        if (pickup.length !== 24) {
            return res.status(400).json({ message: "Truck must be 24 characters id", pickup, });
        }
        if (dropoff.length !== 24) {
            return res.status(400).json({ message: "Truck must be 24 characters id", dropoff, });
        }
        if (pickup === dropoff) {
            return res.status(400).json({ message: "Pickup and dropoff must be different", });
        }
        const verifyTruck = await Truck.findById(truck).exec();
        if (verifyTruck === null) {
            return res.status(400).json({ message: "Truck doesn´t exist", truck, });
        }
        const verifyPickup = await Location.findById(pickup).exec();
        if (verifyPickup === null) {
            return res.status(400).json({ message: "Pickup doesn´t exist", pickup, });
        }
        const verifyDropoff = await Location.findById(dropoff).exec();
        if (verifyDropoff === null) {
            return res.status(400).json({ message: "Dropoff doesn´t exist", dropoff, });
        }
        const newOrder = new Order({
            user: user.toString(),
            truck,
            pickup,
            dropoff,
        })
        await newOrder.save();
        return res.status(200).json({ message: "Order successfully created", newOrder, });
    } catch (error) {
        errorMessage(req, res, error);
    }
}
async function findOneOrder(req: Request, res: Response): Promise<Response | any> {
    try {
        const _id = req.params.id;
        const order = await Order.findById(_id).exec();
        WithoutOrders(req, res, order);
        return res.status(200).json({ message: "Order found", order, });
    } catch (error) {
        errorMessage(req, res, error);
    }
}
async function updateOrder(req: Request, res: Response): Promise<Response | any> {
    try {
        const _id = req.params.id;
        const order = await Order.findById(_id).exec();
        WithoutOrders(req, res, order);
        if (req.body.truck !== undefined) {
            const truck: string = req.body.truck;
            if (truck.length !== 24) {
                return res.status(400).json({ message: "Truck must be 24 characters id", truck, });
            }
            const verifyTruck = await Truck.findById(truck).exec();
            if (verifyTruck === null) {
                return res.status(400).json({ message: "Truck doesn´t exist", });
            }
        }
        if (req.body.pickup !== undefined) {
            const pickup: string = req.body.pickup;
            if (pickup.length !== 24) {
                return res.status(400).json({ message: "Pickup must be 24 characters id", pickup, });
            }
            const verifyPickup = await Location.findById(req.body.pickup).exec();
            if (verifyPickup === null) {
                return res.status(400).json({ message: "Pickup doesn´t exist", });
            }
        }
        if (req.body.dropoff !== undefined) {
            const dropoff: string = req.body.dropoff;
            if (dropoff.length !== 24) {
                return res.status(400).json({ message: "Dropoff must be 24 characters id", dropoff, });
            }
            const verifyDropoff = await Location.findById(req.body.dropoff).exec();
            if (verifyDropoff === null) {
                return res.status(400).json({ message: "Dropoff doesn´t exist", });
            }
        }
        if (req.body.pickup === req.body.dropoff) {
            return res.status(400).json({ message: "Pickup and dropoff must be different", });
        }
        const updatedOrder = await Order.findByIdAndUpdate(_id, {user: req.cookies._id, $set: req.body},{ new: true });
        return res.status(200).json({ message: "Order successfully updated", updatedOrder, });
    } catch (error) {
        errorMessage(req, res, error);
    }
}
async function updateOrderStatus(req: Request, res: Response): Promise<Response | any> {
    try {
        const _id: string = req.params.id;
        const order = await Order.findById(_id).exec();
        if (order === null) {
            return res.status(200).json({ message: "Order doesn´t exist", order, });
        }
        if (order.status === 'created') {
            const newStatus = await Order.findByIdAndUpdate(_id, {status: 'in transit'}, {new: true});
            return res.status(200).json({ message: "Order status updated", newStatus, });
        }
        if (order.status === 'in transit') {
            const newStatus = await Order.findByIdAndUpdate(_id, {status: 'completed'}, {new: true});
            return res.status(200).json({ message: "Order status updated", newStatus, });
        }
        if (order.status === 'completed') {
            return res.status(200).json({ message: "Order has already been completed", });
        }
    } catch (error) {
        errorMessage(req, res, error);
    }
}
async function deleteOrder(req: Request, res: Response): Promise<Response | any> {
    try {
        const _id = req.params.id;
        const order = await Order.findByIdAndDelete(_id);
        WithoutOrders(req, res, order);
        return res.status(200).json({ message: "Order successfully deleted", _id, });
    } catch (error) {
        errorMessage(req, res, error);
    }
}
export {
    getAllOrders,
    findOneOrder,
    createOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
}