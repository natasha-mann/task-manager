import { Router } from "express";
import { tasksRouter } from "./task-routes";
import { authRouter } from "./auth-routes";

export const router = Router();

router.use("/task", tasksRouter);
router.use("/auth", authRouter);
