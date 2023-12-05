import { verifyToken } from "./../auth/auth";
import { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = verifyToken(token);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send("User not authenticated");
  }
};
