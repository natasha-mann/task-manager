import { Router } from "express";
import { login, register } from "../../controllers";

export const userRouter = Router();

userRouter.post("/login", login);
userRouter.get("/register", register);
// userRouter.get("/logout", logout);
