import { Request, Response } from "express";

import User, { IUser } from "../../models/user.model";

type CreateUserPayload = {
  firstName: IUser["firstName"];
  lastName: IUser["lastName"];
  email: IUser["email"];
  password: IUser["password"];
};

export const register = async (req: Request, res: Response) => {
  try {
    const data: CreateUserPayload = req.body;

    await User.create(data);
    res.status(201).send("User successfully registered");
  } catch (error) {
    return res.status(500).send({ message: "Failed to register user", error });
  }
};
