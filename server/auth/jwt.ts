import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { IUser } from "../models/user.model";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "mylocalsecret";
const EXP_TIME = process.env.EXP_TIME || "1h";

type JWTPayload = {
  _id: IUser["_id"];
  email: IUser["email"];
};

export const signToken = (payload: JWTPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXP_TIME });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET, { maxAge: EXP_TIME });
};
