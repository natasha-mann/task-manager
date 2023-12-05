import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "mylocalsecret";
const EXP_TIME = process.env.EXP_TIME || "1h";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
