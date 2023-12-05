import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "../../models/user.model";

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

    return res.status(200).send();
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Unexpected error in login", error });
  }
};
