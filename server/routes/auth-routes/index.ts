import { Router } from "express";
import { login, register } from "../../controllers";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.get("/register", register);
// userRouter.get("/logout", logout);
