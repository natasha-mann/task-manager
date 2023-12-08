import { verifyToken } from "../auth/jwt";
import { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
  token: JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.sendStatus(401);
    }

    const decoded = verifyToken(token);

    (req as CustomRequest).token = decoded as JwtPayload;
    next();
  } catch (err) {
    res.status(401).send("User not authenticated");
  }
};
