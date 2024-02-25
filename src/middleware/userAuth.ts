import { log } from "console";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: any, res: Response, next: any) => {
    const token = req.header("Authorization");
    
  if (!token) return res.status(403).send("Access denied");
  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).send("Invalid token supplied");
  }
};
