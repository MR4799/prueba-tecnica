import { Request, Response } from "express";
import User from "../schemas/users";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { createToken } from "../utils/createToken";
import errorMessage from "../utils/errorMesage";
dotenv.config();
async function getAllUsers(_req: Request, res: Response): Promise<Response | any> {
    try {
        const users = await User.find().exec();
        if (users.length === 0) {
            return res.status(400).json({ message: "Without users", users, });
        }
        return res.status(200).json({ message: "Users successfully obtained", users, });
    } catch (error) {
        errorMessage(_req, res, error);
    }
}
async function findOneUser(req: Request, res: Response): Promise<Response | any> {
    try {
        const user = await User.findOne({ _id: req.cookies._id }).select('-password').exec();
        if (user === null) {
            return res.status(200).json({ message: "User doesn´t exist", user, });
        }
        return res.status(200).json({ message: "User found", user, })
    } catch (error) {
        errorMessage(req, res, error);
    }
}
async function createUser(req: Request, res: Response): Promise<Response | any> {
    try {
        const email: string = req.body.email;
        const password: string = req.body.password;
        if (email === undefined || password === undefined) {
            return res.status(400).json({ message: "Email and password required", });
        }
        const user = await User.findOne({ email: email }).exec();
        if (user !== null) {
            return res.status(400).json({ message: "User already exists", user, });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: hash,
        });
        await newUser.save();
        const token = createToken(newUser._id);
        return res.status(200).json({ message: "User successfully created", newUser, token, })
    } catch (error) {
        errorMessage(req, res, error);
    }
}
async function updateUser(req: Request, res: Response): Promise<Response |any> {
    try {
        const user = await User.findById(req.cookies._id).exec();
        if (user === null) {
            return res.status(400).json({ message: "User doesn´t exist", user, });
        }
        if (req.body.password) {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            await User.findByIdAndUpdate(req.cookies._id, { password: hash }, {new: true});
        }
        const updateUser = await User.findByIdAndUpdate(req.cookies._id, { email: req.body.email }, {new: true});
        return res.status(200).json({ message: "User successfully updated", updateUser,});
    } catch (error) {
        errorMessage(req, res, error);
    }
}
async function login(req: Request, res: Response): Promise<Response | any> {
    try {
        const email: string = req.body.email;
        const password: string = req.body.password;
        const user = await User.findOne({email}).exec();
        if (user === null) {
            return res.status(400).json({ message: "User doesn´t exist", user, });
        }
        const compare = await bcrypt.compare(password, user.password);
        if (compare === false) {
            return res.status(401).json({ message: "Password is wrong", });
        }
        const token = createToken(user._id);
        return res.status(200).json({ message: "Logged successfully", token, });
    } catch (error) {
        errorMessage(req, res, error);
    }
}
async function deleteUser(req: Request, res: Response): Promise<Response | any> {
    try {
        const userId: string = req.params.id; 
        const user = await User.findById(userId).exec();
        if (user === null) {
            return res.status(400).json({ message: "User doesn´t exist", user, });
        }
        await User.findByIdAndDelete(userId);
        return res.status(200).json({ message: "User successfully deleted", userId, });
    } catch (error) {
        errorMessage(req, res, error);
    }
}
export {
    getAllUsers,
    findOneUser,
    createUser,
    updateUser,
    login,
    deleteUser,
}