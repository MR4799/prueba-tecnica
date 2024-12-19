import { Request, Response } from "express";

export default async function errorMessage(_req: Request, res: Response, error: unknown): Promise<Response | any> {
    return res.status(500).json({ message: "Internal Server Error", error, }); 
}