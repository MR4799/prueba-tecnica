import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import User from '../schemas/users';
import dotenv from 'dotenv';
dotenv.config();
async function authentication(req: Request, res: Response, next: NextFunction): Promise<Response | any>{
    try {
        const JWT_SECRET = process.env.JWT_SECRET as string;
        const [type, token] = req.headers["authorization"]?.split(" ") ?? [];
        type === 'Bearer' ? token : undefined;
        if (token === undefined) return res.status(401).json({ message: "Access denied" });
        const verify = await jwt.verify(token, JWT_SECRET);
        const user = await User.findById(verify.sub).select('_id, email').exec();
        if (user) {
            req.cookies = user;
            return next();
        }
        return res.status(404).json({ message: "Usuario no encontrado", });
    } catch (error) {
        res.status(401).json({ message: "Access denied", });
        return next(error);
    }
}
export default authentication;