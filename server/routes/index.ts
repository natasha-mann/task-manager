import { Router } from "express";
import { tasksRouter } from "./task-routes";

export const router = Router();

router.use("/tasks", tasksRouter);
