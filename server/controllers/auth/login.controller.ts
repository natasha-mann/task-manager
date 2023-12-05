import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../../models/user.model";
import { signToken } from "../../auth/auth";

type LoginPayload = {
  email: IUser["email"];
  password: IUser["password"];
};

export const login = async (req: Request, res: Response) => {
  try {
    const user: LoginPayload = req.body;
    const existingUser = await User.findOne({ email: user.email });

    if (!existingUser) {
      return res.status(403).send({ message: "Incorrect email or password" });
    }

    const isMatch = bcrypt.compareSync(user.password, existingUser.password);

    if (!isMatch) {
      return res.status(403).send({ message: "Incorrect email or password" });
    }

    const token = signToken({
      _id: existingUser._id?.toString(),
      email: existingUser.email,
    });

    return res
      .status(200)
      .send({
        user: { _id: existingUser._id, email: existingUser.email },
        token,
      });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Unexpected error in login", error });
  }
};
