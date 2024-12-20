import  jwt  from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const createToken = (user: unknown): string => {
    const payload = {sub: user};
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: process.env.EXPIRES_IN, });
    return token;
}