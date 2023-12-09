import { Request, Response } from "express";

import User, { IUser } from "../../models/user.model";
import { signToken } from "../../auth/jwt";

type CreateUserPayload = {
  firstName: IUser["firstName"];
  lastName: IUser["lastName"];
  email: IUser["email"];
  password: IUser["password"];
};

export const register = async (req: Request, res: Response) => {
  try {
    const data: CreateUserPayload = req.body;

    const newUser = await User.create(data);

    const token = signToken({
      id: newUser.id?.toString(),
      email: newUser.email,
    });

    return res.status(200).send({
      user: { id: newUser.id, email: newUser.email },
      token,
    });
  } catch (error) {
    return res.status(500).send({ message: "Failed to register user", error });
  }
};
